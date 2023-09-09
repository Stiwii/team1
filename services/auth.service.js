/* eslint-disable no-useless-catch */
const UsersService = require('../services/users.service')
const { comparePassword } = require('../utils/crypto')
const usersService = new UsersService()
const jwt = require('jsonwebtoken')

class AuthService {

  constructor() {
  }

  async checkUsersCredentials(email, password) {
    try {
      let user = await usersService.getUserByEmailOr404(email)
      let verifyPassword = comparePassword(password, user.password)
      if (verifyPassword) return user
    } catch (error) {
      throw error
    }
  }

  async createRecoveryToken(email) {
    try {
      let user = await usersService.getUserByEmailOr404(email)
      const token = jwt.sign({
        id: user.id,
        email: user.email,
        role: user.profile[0].role.name,
        profileId: user.profile[0].id
      },process.env.JWT_SECRET_WORD, { expiresIn: '900s' })
      return { user, token }
    } catch (error) {
      throw error
    }
  }

  async changePassword({ id, exp }, newPassword, token) {
    try {
      await usersService.verifiedTokenUser(id, token, exp)
      let restoreUser = await usersService.updatePassword(id, newPassword)
      return restoreUser
    } catch (error) {
      throw error
    }
  }

}

module.exports = AuthService