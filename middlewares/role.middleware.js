const CustomError = require('../utils/custom-error')

const roleMiddleware = (request, response, next) => {
  if (request.user.role === 'admin') {
    next()
  } else {
    throw new CustomError('This endpoit is only for admins', 403, 'Permission Denied')
  }
}


module.exports = roleMiddleware

