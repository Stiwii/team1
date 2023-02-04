const UsersService = require('../services/users.service')
const { comparePassword } = require('../utils/crypto')
const usersService = new UsersService()
const jwt = require('jsonwebtoken')


class AuthService {

  constructor() {
  }

  async checkUsersCredentials(email, password) {
    // eslint-disable-next-line no-useless-catch
    try {
      let user = await usersService.getUserByEmail(email)
      let verifyPassword = comparePassword(password, user.password)
      if (verifyPassword) return user
    } catch (error) {
      throw error
    }
  }

  async createRecoveryToken(email) {
    // eslint-disable-next-line no-useless-catch
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
      throw error
    }
  }

  async changePassword({ id, exp }, newPassword, token) {
    // eslint-disable-next-line no-useless-catch
    try {
      // console.log("FROM CHANGE: ",id,email,exp);
      let userVerified = await usersService.verifiedToken(id, token)
      if (userVerified && Date.now() < exp * 1000) {
        let data = await usersService.updatePassword(id, newPassword)
        return data
      }
      return null
    } catch (error) {
      throw error
    }
  }

}

module.exports = AuthService