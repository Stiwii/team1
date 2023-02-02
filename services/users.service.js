const models = require('../database/models')
const uuid = require('uuid')
const { hashPassword } = require('../utils/crypto')
const { Op } = require('sequelize')
const { CustomError } = require('../utils/custom-error')


class UsersService {

  constructor() {
  }

  async findAndCount(query) {
    const options = {
      where: {},
    }

    const { limit, offset } = query
    if (limit && offset) {
      options.limit = limit
      options.offset = offset
    }

    const { name } = query
    if (name) {
      options.where.name = { [Op.iLike]: `%${name}%` }
    }

    options.distinct = true

    const users = await models.Users.scope('public_view').findAndCountAll(options)
    return users
  }

  async createUser({ first_name, last_name, email, username, password }) {
    const transaction = await models.sequelize.transaction()
    try {
      let newUser = await models.Users.create({
        id: uuid.v4(),
        first_name: first_name,
        last_name: last_name,
        email: email,
        username: username,
        password: hashPassword(password),
      }, { transaction })

      await transaction.commit()
      return newUser
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

  async getMyUser(id) {
    let user = await models.Users.scope('public_view').findOne({
      where: {
        id: id
      }
      // ,
      // include: [{
      //   model: models.Profiles.scope('public_view'),
      //   as: 'profile'
      // }]
    })

    // if (!user) throw new CustomError('Not found user', 404, 'Not Found')


    return user
  }

  //Return not an Instance raw:true | we also can converted to Json instead
  async getUser(id) {
    let user = await models.Users.findByPk(id, { raw: true })
    return user
  }

  async verifiedToken(id, token) {
    let user = await models.Users.findOne({
      where: {
        id: id,
        token: token
      }
    })
    return user
  }

  async getInfo(id) {
    let user = await models.Users.scope('user_info').findOne({
      where: {
        id: id
      },
      include: [{
        model: models.Profiles.scope('new_profile'),
        as: 'profile',
        include: {
          model: models.Roles.scope('public_view'),
          as: 'role'
        }
      }]
    })
    if (!user) throw new CustomError('Not found user', 404, 'Not Found')
    return user
  }



  async updateUser(id, obj) {
    const transaction = await models.sequelize.transaction()
    try {
      let profileID = obj.profile_id
      let user = await models.Users.scope('public_view').findByPk(id)
      if (!user) throw new CustomError('Not found user', 404, 'Not Found')

      let profile = await models.Profiles.findByPk(profileID)
      if (!profile) throw new CustomError('Not found user', 404, 'Not Found')

      let updatedUser = await user.update(obj, { transaction })

      let updatedProfile = await profile.update(obj, { transaction })

      await transaction.commit()

      return ({
        username: updatedUser.username,
        first_name: updatedUser.first_name,
        last_name: updatedUser.last_name,
        image_url: updatedProfile.image_url,
        code_phone: updatedProfile.code_phone,
        phone: updatedProfile.phone
      })
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

  async updatePassword(id, newPassword) {
    const transaction = await models.sequelize.transaction()
    try {
      let user = await models.Users.scope('public_view').findByPk(id)
      if (!user) throw new CustomError('Not found user', 404, 'Not Found')


      let restoreUser = await user.update({ password: hashPassword(newPassword) }, { transaction })

      await transaction.commit()

      return restoreUser
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

  async setTokenUser(id, token) {
    const transaction = await models.sequelize.transaction()
    try {
      let user = await models.Users.scope('set_token').findByPk(id)
      if (!user) throw new CustomError('Not found user', 404, 'Not Found')
      let User = await user.update({ token: token }, { transaction })

      await transaction.commit()

      return User
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }



  async setUser({ firstName, lastName, email, username, password }) {
    const transaction = await models.sequelize.transaction()
    try {
      let newUser = await models.Users.create({
        id: uuid.v4(),
        first_name: firstName,
        last_name: lastName,
        email: email,
        username: username,
        password: hashPassword(password)
      }, { transaction })
      let newProfile = await models.Profiles.create({
        id: uuid.v4(),
        user_id: newUser.id
      }, { transaction })

      await transaction.commit()
      return {
        id: newUser.id,
        firstName: newUser.first_name,
        lastName: newUser.last_name,
        email: newUser.email,
        username: newUser.username,
        roleId: newProfile.role_id
      }
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

  async getUserByEmail(email) {
    let user = await models.Users.scope('check_user').findOne({
      where: {
        email: email
      },
      include: [{
        model: models.Profiles.scope('new_profile'),
        as: 'profile',
        include: {
          model: models.Roles.scope('public_view'),
          as: 'role'
        }
      }]
    })
    return user
  }
  async removeUser(id) {
    const transaction = await models.sequelize.transaction()
    try {
      let user = await models.Users.findByPk(id)
      if (!user) throw new CustomError('Not found user', 404, 'Not Found')
      await user.destroy({ transaction })
      await transaction.commit()

      return user
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
}



module.exports = UsersService