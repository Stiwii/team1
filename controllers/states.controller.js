const StatesService = require('../services/states.service')
const { getPagination, getPagingData } = require('../utils/sequelize-utils')

const statesService = new StatesService()

const getStates = async (request, response, next) => {
  try {
    let query = request.query
    let { page, size } = query
    const { limit, offset } = getPagination(page, size, '10')
    query.limit = limit
    query.offset = offset

    let states = await statesService.findAndCount(query)
    const results = getPagingData(states, page, limit)
    return response.json({ results: results })

  } catch (error) {
    next(error)
  }
}

module.exports = {
  getStates
}