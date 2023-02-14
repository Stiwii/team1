const CitiesService = require('../services/cities.service')
const { getPagination, getPagingData } = require('../utils/sequelize-utils')

const citiesService = new CitiesService()

const getCities = async (request, response, next) => {
  try {
    let query = request.query
    let { page, size } = query
    const { limit, offset } = getPagination(page, size, '10')
    query.limit = limit
    query.offset = offset

    let cities = await citiesService.findAndCount(query)
    const results = getPagingData(cities, page, limit)
    return response.json({ results: results })

  } catch (error) {
    next(error)
  }
}

module.exports = {
  getCities
}