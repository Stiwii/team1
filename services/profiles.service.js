const models = require('../database/models')
const uuid = require('uuid')
const { Op } = require('sequelize')
const  CustomError  = require('../utils/custom-error')

class ProfilesService {

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

    //Necesario para el findAndCountAll de Sequelize
    options.distinct = true

    const profiles = await models.Profiles.findAndCountAll(options)
    return profiles
  }

  async createProfile(obj) {
    const transaction = await models.sequelize.transaction()
    try {
      let newProfile = await models.Profiles.create({
        id: uuid.v4(),
        user_id: obj.user_id,
        role_id: obj.role_id,
        country_id: obj.country_id,
        image_url: obj.image_url,
        code_phone: obj.code_phone,
        phone: obj.phone
      }, { transaction })

      await transaction.commit()
      return newProfile
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
  //Return Instance if we do not converted to json (or raw:true)
  async getProfileOr404(id) {
    let profile = await models.Profiles.findByPk(id)

    if (!profile) throw new CustomError('Not found Profile', 404, 'Not Found')

    return profile
  }

  //Return not an Instance raw:true | we also can converted to Json instead
  async getProfile(id) {
    let profile = await models.Profiles.findByPk(id, { raw: true })
    return profile
  }

  // async updateProfile(id, obj) {
  //   const transaction = await models.sequelize.transaction()
  //   try {
  //     let profile = await models.Profiles.findByPk(id)

  //     if (!profile) throw new CustomError('Not found profile', 404, 'Not Found')

  //     let updatedProfile = await profile.update(obj, {
  //       where: {
  //         id: id
  //       }
  //     }, { transaction })

  //     await transaction.commit()

  //     return updatedProfile
  //   } catch (error) {
  //     await transaction.rollback()
  //     throw error
  //   }
  // }

  // async removeProfile(id) {
  //   const transaction = await models.sequelize.transaction()
  //   try {
  //     let profile = await models.Profiles.findByPk(id)

  //     if (!profile) throw new CustomError('Not found profile', 404, 'Not Found')

  //     await profile.destroy({ transaction })

  //     await transaction.commit()

  //     return profile
  //   } catch (error) {
  //     await transaction.rollback()
  //     throw error
  //   }
  // }

}

module.exports = ProfilesService