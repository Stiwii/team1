const bcrypt = require('bcrypt')
const CustomError = require('./custom-error')

const hashPassword = (plainPassword) => {
  if(plainPassword){
    return bcrypt.hashSync(plainPassword, 10)
  }else{
    throw new CustomError('The Key password is not defined', 400, 'Bad Request')
  }
}

const comparePassword = (plainPassword, hashedPassword) => {
  if (plainPassword) {
    let provePassword = bcrypt.compareSync(plainPassword, hashedPassword)
    if (provePassword) return provePassword
    else throw new CustomError('The password entered does not match the username', 401, 'Password is incorrect')
  } else{
    throw new CustomError('The key password is not defined', 400, 'Bad Request')
  }
}

module.exports = {
  hashPassword,
  comparePassword
}