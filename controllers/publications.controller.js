const PublicationsService = require('../services/publications.service')
const PublicationsTypeService = require('../services/publications_types.service')
const TagsService = require('../services/tags.service')
const CustomError = require('../utils/custom-error')
const { getPagination, getPagingData } = require('../utils/sequelize-utils')

const publicationsService = new PublicationsService()
const publicationsTypeService = new PublicationsTypeService()
const tagsService = new TagsService()

const getPublications = async (request, response, next) => {
  try {
    let query = request.query
    let { page, size, tags, publicationsTypes, description, title } = query

    const { limit, offset } = getPagination(page, size, '10')
    query.limit = limit
    query.offset = offset
    query.tags = tags
    query.publicationsTypes = publicationsTypes
    query.title = title
    query.description = description

    let publications = await publicationsService.findAndCount(query)
    const results = getPagingData(publications, page, limit)
    return response.json({ results: results })

  } catch (error) {
    next(error)
  }
}

const getPublicationsofUser = async (request, response, next) => {
  try {
    let query = request.query
    let { page, size, tags } = query

    const { limit, offset } = getPagination(page, size, '10')
    query.limit = limit
    query.offset = offset
    query.tags = tags
    const { idUSer } = request.params
    const profileId = request.user.profileId
    const userId = request.user.id
    if (idUSer == userId) {
      let publications = await publicationsService.findAndCount2(query, profileId)
      const results = getPagingData(publications, page, limit)
      return response.json({ results: results })
    } else {
      throw new CustomError('User not authorized,check the userID params', 401, 'Unauthorized')
    }
  } catch (error) {
    next(error)
  }
}


const addPublication = async (request, response, next) => {
  try {
    let profile_id = request.user.profileId
    let { title, idPublicationType, description, urlShare, tags } = request.body
    await publicationsTypeService.getPublicationTypeOr404(idPublicationType)
    await tagsService.getTagsOr404(tags)
    let publication = await publicationsService.createPublication({ profile_id, idPublicationType, title, description, urlShare, tags })
    return response.status(201).json({ results: publication })
  } catch (error) {
    next(error)
  }
}

const getPublication = async (request, response, next) => {
  try {
    let { idPublication } = request.params
    let publication = await publicationsService.getPublicationOr404(idPublication)
    return response.json({ results: publication })
  } catch (error) {
    next(error)
  }
}

const getPublicationsByUser = async (request, response, next) => {
  try {
    let profileId = request.user.profileId
    let publication = await publicationsService.findPublicationByProfileOr404(profileId)
    return response.json({ results: publication })
  } catch (error) {
    next(error)
  }
}

const updatePublication = async (request, response, next) => {
  try {
    let { id } = request.params
    let { body } = request
    let publication = await publicationsService.updatePublication(id, body)
    return response.json({ results: publication })
  } catch (error) {
    next(error)
  }
}

const removePublication = async (request, response, next) => {
  try {
    let { idPublication } = request.params
    let profileId = request.user.profileId
    let publication = await publicationsService.removePublication(idPublication, profileId)
    return response.json({ results: publication, message: 'removed' })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getPublications,
  getPublicationsofUser,
  addPublication,
  getPublication,
  updatePublication,
  removePublication,
  getPublicationsByUser
}