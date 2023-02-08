const CustomError = require('../utils/custom-error')

const checkQueryParameters = (request, response, next) => {
  let query = (request.query)
  const positiveInteger = /^\+?(0|[1-9]\d*)$/
  if (query.size && !positiveInteger.test(query.size.trim())) {
    throw new CustomError(`The value of size is invalid ('${query.size}'), check the Schema'`, 400, 'Invalid Query')
  }
  if (query.page && !positiveInteger.test(query.page.trim())) {
    throw new CustomError(`The value of page is invalid ('${query.size}'), check the Schema`, 400, 'Invalid Query`')
  }
  next()
}
module.exports = checkQueryParameters
