const CustomError = require('../utils/custom-error')

const checkParam = (request, response, next) => {
  switch (Object.keys(request.params)[0]){
  case 'token': {
    const formatToken = Object.values(request.params)[0].trim().split('.')
    if (formatToken.length !== 3) {
      throw new CustomError('The params token has a not a valid format', 401, 'Invalid params')
    }
    next()
    break
  }
  case 'idPublication':
  case 'idUSer': {
    const formatUUID = Object.values(request.params)[0].trim()
    const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi
    if (regexExp.test(formatUUID)) {
      next()
      break
    }
    throw new CustomError('The params ID does not have the data type uuid', 400, 'Invalid params')
  }
  case 'idTag':
  case 'idPublicationType': {
    const positiveInteger = /^\+?(0|[1-9]\d*)$/
    const formatSerial = Number(Object.values(request.params)[0].trim())
    if (positiveInteger.test(formatSerial)) {
      next()
      break
    }
    throw new CustomError('The params ID does not have the data type serial', 400, 'Invalid params')
  }
  default: {
    next()
  }
  }
}
module.exports = checkParam
