const CustomError = require('../utils/custom-error')

const checkRequest = (property, schema) => {
  return (request, response, next) => {
    const { error } = schema.validate(request[property],{ abortEarly: false });
    if (error) {
      throw new CustomError(error.details.map(err => `( ${err.type} : ${err.message} )`).toString(), 400, 'Bad Request')
    } else {
      next()
    }
  }
}


module.exports = checkRequest

