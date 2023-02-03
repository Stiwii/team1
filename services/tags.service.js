const models = require('../database/models')
const uuid = require('uuid')
const { Op } = require('sequelize')

const  CustomError  = require('../utils/custom-error')

class TagsService {

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

    const tags = await models.Tags.findAndCountAll(options)
    return tags
  }

  async createTag(name) {
    const transaction = await models.sequelize.transaction()
    try {
      if(!name)  throw new CustomError('The request parameters do not match the request schema', 404, 'Invalid Parameters')
      let newTag = await models.Tags.create({
        name: name
      }, { transaction })

      await transaction.commit()
      return newTag
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
  //Return Instance if we do not converted to json (or raw:true)
  async getTagOr404(id) {
    let tag = await models.Tags.findByPk(id)

    if (!tag) throw new CustomError('Not found tag', 404, 'Not Found')

    return tag
  }

  async getTagsOr404(tags) {
    let arrayTags = tags.split(',')
    let tag = await models.Tags.findAll({
      where: {
        id: arrayTags
      }
    })
    tags= tag.map(item => item.dataValues.id);
    if (arrayTags.length !== tags.length) throw new CustomError('Not found tag', 404, 'Not Found')
    return tags
  }

  //Return not an Instance raw:true | we also can converted to Json instead
  async getTag(id) {
    let tag = await models.Tags.findByPk(id, { raw: true })
    return tag
  }

  async updateTag(id, obj) {
    const transaction = await models.sequelize.transaction()
    try {
      let tag = await models.Tags.findByPk(id)

      if (!tag) throw new CustomError('Not found tag', 404, 'Not Found')

      let updatedTag = await tag.update(obj, {
        where: {
          id: id
        }
      }, { transaction })

      await transaction.commit()

      return updatedTag
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

  async removeTag(id) {
    const transaction = await models.sequelize.transaction()
    try {
      let tag = await models.Tags.findByPk(id)

      if (!tag) throw new CustomError('Not found tag', 404, 'Not Found')

      await tag.destroy({ transaction })

      await transaction.commit()

      return tag
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

}

module.exports = TagsService