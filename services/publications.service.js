const models = require('../database/models')
const uuid = require('uuid')
const { Op, cast, literal } = require('sequelize')
const  CustomError  = require('../utils/custom-error')

class PublicationsService {
  
  constructor() {
  }
  async findAndCount(query) {
    const { limit, offset, tags } = query
  
    const options = {
      attributes:{include:[
        [cast(literal(`(SELECT COUNT(*) FROM "votes" WHERE "votes"."publication_id" = "Publications"."id")`), 'integer'), 'votes_count']
      ]},
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

    //Necesario para el findAndCountAll de Sequelize
    options.distinct = true

    const publications = await models.Publications.scope('get_publication').findAndCountAll(options)
    return publications
  }

  async findAndCount2(query, profileId) {
    const options = {
      where: { profile_id: profileId },
      attributes: {
        include:[
        [cast(literal(`(SELECT COUNT(*) FROM "votes" WHERE "votes"."publication_id" = "Publications"."id")`), 'integer'), 'votes_count']
      ]},
    }

    const { limit, offset } = query
    if (limit && offset) {
      options.limit = limit
      options.offset = offset
    }

    options.distinct = true

    const votes = await models.Publications.scope('public_view').findAndCountAll(options)
    return votes
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
  //Return Instance if we do not converted to json (or raw:true)
  // async getPublicationOr404(id) {
  //   let publication = await models.Publications.findByPk(id)

  //   if (!publication) throw new CustomError('Not found Publication', 404, 'Not Found')

  //   return publication
  // }

  //Return not an Instance raw:true | we also can converted to Json instead
  async getPublicationOr404(idPublication) {
    // let publication = await models.Publications.findByPk(id, { raw: true })
    let publication = await models.Publications.scope('get_publication').findOne({
      where: {
        id: idPublication
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
      }]
    })
    if (!publication) throw new CustomError('Not found Publication', 404, 'Not Found')
    return publication
  }

  async findPublicationByProfileOr404(profileId) {
    let publication = await models.Publications.findAndCountAll({
      where: {
        profile_id: profileId
      }
    })
    if (!publication) throw new CustomError('Publication with the user profile was not found', 404, 'Not Found')
    return publication
  }



  async updatePublication(id, obj) {
    const transaction = await models.sequelize.transaction()
    try {
      let publication = await models.Publications.findByPk(id,{ raw: true })

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
      let publication = await models.Publications.findByPk(idPublication,{ raw: true })

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
