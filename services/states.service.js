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

  async createState(obj) {
    const transaction = await models.sequelize.transaction()
    try {
      let newState = await models.States.create({
        id: uuid.v4(),
        country_id: obj.country_id,
        name: obj.name
      }, { transaction })

      await transaction.commit()
      return newState
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
  //Return Instance if we do not converted to json (or raw:true)
  async getStateOr404(id) {
    let state = await models.States.findByPk(id)

    if (!state) throw new CustomError('Not found State', 404, 'Not Found')

    return state
  }

  //Return not an Instance raw:true | we also can converted to Json instead
  async getState(id) {
    let state = await models.States.findByPk(id, { raw: true })
    return state
  }

  async updateState(id, obj) {
    const transaction = await models.sequelize.transaction()
    try {
      let state = await models.States.findByPk(id)

      if (!state) throw new CustomError('Not found State', 404, 'Not Found')

      let updatedState = await state.update(obj, {
        where: {
          id: id
        }
      }, { transaction })

      await transaction.commit()

      return updatedState
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

  async removeState(id) {
    const transaction = await models.sequelize.transaction()
    try {
      let state = await models.States.findByPk(id)

      if (!state) throw new CustomError('Not found State', 404, 'Not Found')

      await state.destroy({ transaction })

      await transaction.commit()

      return state
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

}

module.exports = StatesService