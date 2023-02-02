const CountriesService = require('../services/countries.service')
const { getPagination, getPagingData } = require('../utils/sequelize-utils')

const countriesService = new CountriesService()

const getCountries = async (request, response, next) => {
  try {
    let query = request.query
    let { page, size } = query
    const { limit, offset } = getPagination(page, size, '10')
    query.limit = limit
    query.offset = offset

    let countries = await countriesService.findAndCount(query)
    const results = getPagingData(countries, page, limit)
    return response.json({ results: results })

  } catch (error) {
    next(error)
  }
}

const addCountry = async (request, response, next) => {
  try {
    let { body } = request
    let country = await countriesService.createCountry(body)
    return response.status(201).json({ results: country })
  } catch (error) {
    next(error)
  }
}

const getCountry = async (request, response, next) => {
  try {
    let { id } = request.params
    let countries = await countriesService.getCountryOr404(id)
    return response.json({ results: countries })
  } catch (error) {
    next(error)
  }
}

// const updateCountry = async (request, response, next) => {
//   try {
//     let { id } = request.params
//     let { body } = request
//     let country = await countriesService.updateCountry(id, body)
//     return response.json({ results: country })
//   } catch (error) {
//     next(error)
//   }
// }

const removeCountry = async (request, response, next) => {
  try {
    let { id } = request.params
    let country = await countriesService.removeCountry(id)
    return response.json({ results: country, message: 'removed' })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getCountries,
  addCountry,
  getCountry,
  removeCountry
}