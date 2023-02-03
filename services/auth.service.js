const UsersService = require('../services/users.service')
const  CustomError  = require('../utils/custom-error')
const { comparePassword } = require('../utils/crypto')
const usersService = new UsersService()
const jwt = require('jsonwebtoken')


class AuthService {

  constructor() {
  }

  async checkUsersCredentials(email, password) {
    try {
      let user = await usersService.getUserByEmail(email)
      if (!user) throw new CustomError('Not found user', 404, 'Not Found')
      let verifyPassword = comparePassword(password, user.password)
      if (!verifyPassword) throw new CustomError('the password entered with matches the user', 401, 'Password is incorrect')
      return user
    } catch (error) {
      return error
    }
  }

  async createRecoveryToken(email) {
    try {
      let user = await usersService.getUserByEmail(email)
      if (user) {
        const token = jwt.sign({
          id: user.id,
          email: user.email,
          role: user.profile[0].role.name,
          profileId: user.profile[0].id
        }, process.env.JWT_SECRET_WORD,
        { expiresIn: '900s' })
        return { user, token }
      }
      return null
    } catch (error) {
      return null
    }
  }

  async changePassword({ id, exp }, newPassword, token) {
    try {
      // console.log("FROM CHANGE: ",id,email,exp);
      let userVerified = await usersService.verifiedToken(id, token)
      if (userVerified && Date.now() < exp * 1000) {
        let data = await usersService.updatePassword(id, newPassword)
        return data
      }
      return null
    } catch (error) {
      return null
    }
  }

}

module.exports = AuthService