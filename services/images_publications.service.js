const models = require('../database/models')
// const uuid = require('uuid')
const { Op } = require('sequelize')
const CustomError = require('../utils/custom-error')


class ImagesPublicationsService {

  constructor() {
  }

  async createImage(idImage, fileKey, publicationId) {
    const transaction = await models.sequelize.transaction()
    try {
      let newImage = await models.Images_publications.create({
        id: idImage,
        key_s3: fileKey,
        publication_id: publicationId
      }, { transaction })
      await transaction.commit()
      return newImage
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

  async removeImage(idImage) {
    const transaction = await models.sequelize.transaction()
    try {
      let image = await models.Images_publications.scope('public_view').findByPk(idImage)

      if (!image) throw new CustomError('Not found image', 404, 'Not Found')


      await image.destroy({ transaction })
      await transaction.commit()

      return image
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

  async getImageOr404(idImage) {
    let image = await models.Images_publications.findByPk(idImage)
    if (!image) throw new CustomError('Not found image', 404, 'Not Found')
    return image
  }

  async getImageByPublicationIdOr404(idPublication) {
    let images = await models.Images_publications.findAll({
      where: {
        publication_id: idPublication
      }, raw: true
    })
    if (!images.length) throw new CustomError('No images were found in the publication', 404, 'Not Found')
    return images
  }

  async getImagesByPublicationsOr404(idPublication) {
    let imagesPublications = await models.Images_publications.scope('images_publication').findAll({
      where: {
        publication_id: idPublication
      }
      , raw: true
    })
    if (!imagesPublications.length) throw new CustomError('Not found images', 404, 'Not Found')
    return imagesPublications
  }

  async publicationImagesExist(publicationId) {

    let publicationImagesExist = await models.Images_publications.findOne({
      where: {
        publication_id: publicationId
      }
    }, { raw: true })
    if (publicationImagesExist) throw new CustomError('The publication already has images', 400, 'Can not upload')

    return publicationImagesExist
  }

}


module.exports = ImagesPublicationsService