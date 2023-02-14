const models = require('../database/models')
const uuid = require('uuid')
const { Op } = require('sequelize')
const  CustomError  = require('../utils/custom-error')

class StatesService {

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

    const states = await models.States.scope('public_view').findAndCountAll(options)
    return states
  }

}

module.exports = StatesService