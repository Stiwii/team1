const bcrypt = require('bcrypt')
const CustomError = require('./custom-error')

const hashPassword = (plainPassword) => {
  return bcrypt.hashSync(plainPassword, 10)
}

const comparePassword = (plainPassword, hashedPassword) => {
  if (plainPassword) {
    let provePassword = bcrypt.compareSync(plainPassword, hashedPassword)
    if (provePassword) return provePassword
    else throw new CustomError('the password entered with matches the user', 401, 'Password is incorrect')
  } else {
    throw new CustomError('Put your password', 401, 'Password is incorrect')
  }

}

module.exports = {
  hashPassword,
  comparePassword
}