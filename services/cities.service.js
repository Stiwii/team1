const models = require('../database/models')
const uuid = require('uuid')
const { Op } = require('sequelize')
const CustomError  = require('../utils/custom-error')

class CitiesService {

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

    const cities = await models.Cities.scope('public_view').findAndCountAll(options)
    return cities
  }

  async createCity(obj) {
    const transaction = await models.sequelize.transaction()
    try {
      let newCity = await models.Cities.create({
        id: uuid.v4(),
        state_id: obj.state_id,
        name: obj.name
      }, { transaction })

      await transaction.commit()
      return newCity
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
  //Return Instance if we do not converted to json (or raw:true)
  async getCityOr404(id) {
    let city = await models.Cities.findByPk(id)

    if (!city) throw new CustomError('Not found City', 404, 'Not Found')

    return city
  }

  //Return not an Instance raw:true | we also can converted to Json instead
  async getCity(id) {
    let city = await models.Cities.findByPk(id, { raw: true })
    return city
  }

  async updateCity(id, obj) {
    const transaction = await models.sequelize.transaction()
    try {
      let city = await models.Cities.findByPk(id)

      if (!city) throw new CustomError('Not found City', 404, 'Not Found')

      let updatedCity = await city.update(obj, {
        where: {
          id: id
        }
      }, { transaction })

      await transaction.commit()

      return updatedCity
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

  async removeCity(id) {
    const transaction = await models.sequelize.transaction()
    try {
      let city = await models.Cities.findByPk(id)

      if (!city) throw new CustomError('Not found City', 404, 'Not Found')

      await city.destroy({ transaction })

      await transaction.commit()

      return city
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
}

module.exports = CitiesService