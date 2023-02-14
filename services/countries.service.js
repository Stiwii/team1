const models = require('../database/models')
const uuid = require('uuid')
const { Op } = require('sequelize')
const  CustomError  = require('../utils/custom-error')

class CountriesService {

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

    const countries = await models.Countries.findAndCountAll(options)
    return countries
  }

  //Return Instance if we do not converted to json (or raw:true)
  async getCountryOr404(id) {
    let country = await models.Countries.findByPk(id)

    if (!country) throw new CustomError('Not found Country', 404, 'Not Found')

    return country
  }

  //Return not an Instance raw:true | we also can converted to Json instead
  async getCountry(id) {
    let country = await models.Countries.findByPk(id, { raw: true })
    return country
  }
}

module.exports = CountriesService