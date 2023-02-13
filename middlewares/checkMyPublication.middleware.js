const CustomError = require('../utils/custom-error')
const PublicationsService = require('../services/publications.service')

const publicationsService = new PublicationsService()

const checkMyPublication = async (request, response, next) => {
  const { idPublication } = request.params
  const profileId = request.user.profileId
  try {
    let publication = await publicationsService.getPublicationOr404(idPublication)
    if (profileId === publication.profile_id) {
      next()
    } else {
      throw new CustomError('The user does not register a this publication', 403, 'Unauthorized')
    }
  } catch (error) {
    next(error)
  }
}

module.exports = checkMyPublication

