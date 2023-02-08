const bcrypt = require('bcrypt')
const CustomError = require('./custom-error')

const hashPassword = (plainPassword) => {
  return bcrypt.hashSync(plainPassword, 10)
}

const comparePassword = (plainPassword, hashedPassword) => {
  if (plainPassword) {
    let provePassword = bcrypt.compareSync(plainPassword, hashedPassword)
    if (provePassword) return provePassword
    else throw new CustomError('The password entered does not match the username', 401, 'Password is incorrect')
  } 
}

module.exports = {
  hashPassword,
  comparePassword
}