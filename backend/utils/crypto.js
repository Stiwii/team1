const bcrypt = require('bcrypt')

const hashPassword = (plainPassword) => {
  return bcrypt.hashSync(plainPassword, 10)
}

const comparePassword = (plainPassword, hashedPassword) => {
  try {
    if(plainPassword){
      return bcrypt.compareSync(plainPassword, hashedPassword)
    }
    return null
  } catch (error){
    return error
  }
}

module.exports = {
  hashPassword,
  comparePassword
}