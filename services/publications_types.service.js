const models = require('../database/models')
const uuid = require('uuid')
const { Op } = require('sequelize')
const CustomError = require('../utils/custom-error')

class PublicationsTypesService {

  constructor() {

  }

  async findAndCount(query) {
    const options = {
      where: {},
    }

    const { limit, offset } = query
    if (limit && offset) {
      options.limit = limit
      options.offset = offset
    }

    const { name } = query
    if (name) {
      options.where.name = { [Op.iLike]: `%${name}%` }
    }

    //Necesario para el findAndCountAll de Sequelize
    options.distinct = true

    const publicationsTypes = await models.Publications_types.findAndCountAll(options)
    return publicationsTypes
  }

  //Return Instance if we do not converted to json (or raw:true)

  async getPublicationTypeOr404(idPublicationType) {
    let publicationType = await models.Publications_types.findByPk(idPublicationType)
    if (!publicationType) throw new CustomError('Not found PublicationType', 404, 'Not Found')

    return publicationType
  }

  //Return not an Instance raw:true | we also can converted to Json instead
  async getPublicationType(idPublicationType) {

    let publicationType = await models.Publications_types.findByPk(idPublicationType, { raw: true })
    return publicationType
  }

}

module.exports = PublicationsTypesService