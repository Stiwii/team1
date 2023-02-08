const CustomError = require('../utils/custom-error')

const checkValues = (request, response, next) => {
  const obj = request.body
  const body = []
  const arr = Object.entries(obj)
  for (const item of arr) {
    if (!item[0] || !item[1]) {
      body.push(item[0])
    }
  }
  if (body.length) {
    throw new CustomError(`The JSON values are invalid [${body}], check the Schema`, 400, 'Invalid Values')
  }
  next()
}

module.exports = checkValues
