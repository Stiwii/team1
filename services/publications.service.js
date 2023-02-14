const models = require('../database/models')
const uuid = require('uuid')
const { Op, cast, literal } = require('sequelize')
const { getObjectSignedUrl } = require('../libs/s3')
const CustomError = require('../utils/custom-error')

class PublicationsService {

  constructor() {
  }
  async findAndCountAllPublications(query) {
    const { limit, offset, tags } = query

    const options = {
      where: {},
      attributes: {
        include: [
          [cast(literal(`(SELECT COUNT(*) FROM "votes" WHERE "votes"."publication_id" = "Publications"."id")`), 'integer'), 'votes_count']
        ]
      },
      include: [{
        model: models.Cities.scope('get_city'),
        as: 'city',
        include: {
          model: models.States.scope('get_state'),
          as: 'state',
          include: {
            model: models.Countries.scope('public_view')
          }
        }
      }, {
        model: models.Publications_types.scope('public_view'),
        as: 'publication_type',
      },
      {
        model: models.Tags.scope('no_timestamps'),
        as: 'tags',
        through: {
          attributes: []
        }
      }, {
        model: models.Images_publications.scope('images_publication'),
        as: 'images_publication'
      }
      ]
    }

    if (limit && offset) {
      options.limit = limit
      options.offset = offset
    }

    if (tags) {
      let tagsIDs = tags.split(',')
      options.include.push({ // El options que les di en el ejemplo 
        model: models.Tags.scope('public_view'),
        as: 'tags',
        required: true,
        where: { id: tagsIDs },
        through: { attributes: [] }
      })
    }
    const { publicationsTypesIds } = query

    if (publicationsTypesIds) {
      let publicationsTypeIds = publicationsTypesIds.split(',')
      options.where.publication_type_id = { [Op.or]: publicationsTypeIds }
    }

    const { title } = query
    if (title) {
      options.where.title = { [Op.iLike]: `%${title}%` }
    }

    const { description } = query
    if (description) {
      options.where.description = { [Op.iLike]: `%${description}%` }
    }

    //Necesario para el findAndCountAll de Sequelize
    options.distinct = true

    const publications = await models.Publications.scope('get_publication').findAndCountAll(options)

    await Promise.all(publications.rows.map(async (publication) => {
      await Promise.all(publication.images_publication.map(async (image) => {
        image.image_url = await getObjectSignedUrl(image.key_s3)
      }))
    }))
    
    return publications
  }

  async findAndCountAllPublicationsByUser(query, profileId) {
    const options = {
      where: { profile_id: profileId },
      attributes: {
        include: [
          [cast(literal(`(SELECT COUNT(*) FROM "votes" WHERE "votes"."publication_id" = "Publications"."id")`), 'integer'), 'votes_count']
        ]
      },
      include: [{
        model: models.Cities.scope('get_city'),
        as: 'city',
        include: {
          model: models.States.scope('get_state'),
          as: 'state',
          include: {
            model: models.Countries.scope('public_view')
          }
        }
      }, {
        model: models.Publications_types.scope('public_view'),
        as: 'publication_type',
      },
      {
        model: models.Tags.scope('no_timestamps'),
        as: 'tags',
        through: {
          attributes: []
        }
      }, {
        model: models.Images_publications.scope('images_publication'),
        as: 'images_publication'
      }
      ]
    }

    const { limit, offset } = query
    if (limit && offset) {
      options.limit = limit
      options.offset = offset
    }

    options.distinct = true

    const publications = await models.Publications.scope('public_view').findAndCountAll(options)
    await Promise.all(publications.rows.map(async (publication) => {
      await Promise.all(publication.images_publication.map(async (image) => {
        image.image_url = await getObjectSignedUrl(image.key_s3)
      }))
    }))
    return publications
  }

  async createPublication({ profile_id, idPublicationType, title, description, urlShare, tags }) {
    const transaction = await models.sequelize.transaction()

    try {
      let newPublication = await models.Publications.create({
        id: uuid.v4(),
        profile_id: profile_id,
        publication_type_id: idPublicationType,
        title: title,
        description: description,
        content: urlShare,
        city_id: 1,
      }, { transaction })

      let tags_ids = tags.split(',')
      await newPublication.setTags(tags_ids, { transaction })

      await transaction.commit()
      return newPublication
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

  //Return not an Instance raw:true | we also can converted to Json instead
  async getPublicationOr404(idPublication) {

    let publication = await models.Publications.scope('get_publication').findOne({
      where: {
        id: idPublication
      },
      attributes: {
        include: [
          [cast(literal(`(SELECT COUNT(*) FROM "votes" WHERE "votes"."publication_id" = "Publications"."id")`), 'integer'), 'votes_count']
        ]
      }
      ,
      include: [{
        model: models.Cities.scope('get_city'),
        as: 'city',
        include: {
          model: models.States.scope('get_state'),
          as: 'state',
          include: {
            model: models.Countries.scope('public_view')
          }
        }
      }, {
        model: models.Publications_types.scope('public_view'),
        as: 'publication_type',
      },
      {
        model: models.Tags.scope('no_timestamps'),
        as: 'tags',
        through: {
          attributes: []
        }
      }, {
        model: models.Images_publications.scope('images_publication'),
        as: 'images_publication'
      }
      ]
    })
    await Promise.all(publication.images_publication.map(async (image) => {
      image.image_url = await getObjectSignedUrl(image.key_s3)
    }
    ))
    if (!publication) throw new CustomError('Not found Publication', 404, 'Not Found')
    return publication
  }

  async updatePublication(id, obj) {
    const transaction = await models.sequelize.transaction()
    try {
      let publication = await models.Publications.findByPk(id)

      if (!publication) throw new CustomError('Not found Publication', 404, 'Not Found')

      let updatedPublication = await publication.update(obj, {
        where: {
          id: id
        }
      }, { transaction })

      await transaction.commit()

      return updatedPublication
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

  async removePublication(idPublication, profileId) {
    const transaction = await models.sequelize.transaction()
    try {
      let publication = await models.Publications.findByPk(idPublication)

      if (!publication) throw new CustomError('Not found Publication', 404, 'Not Found')

      if (publication.profile_id == profileId) {
        await publication.destroy({ transaction })
        await transaction.commit()

        return publication
      } else {
        return null
      }
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

}

module.exports = PublicationsService
