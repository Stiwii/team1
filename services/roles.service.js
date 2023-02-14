const models = require('../database/models')
const { Op } = require('sequelize')
const  CustomError  = require('../utils/custom-error')

class RolesService {

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

    const roles = await models.Roles.findAndCountAll(options)
    return roles
  }

}

module.exports = RolesService