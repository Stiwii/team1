const ImagesPublicationsService = require('../services/images_publications.service')
const fs = require('fs')
const util = require('util')
const uuid = require('uuid')
const { uploadFile, getObjectSignedUrl, deleteFile, getFileStream } = require('../libs/s3')
const sharp = require('sharp')
const { log } = require('console')


const unlinkFile = util.promisify(fs.unlink)

const imagesPublicationsService = new ImagesPublicationsService()


const uploadImagePublication = async (request, response, next) => {
  const { idPublication } = request.params
  const files = request.files
  try {

    let imagesKeys = []
    await imagesPublicationsService.publicationImagesExist(idPublication)

    await Promise.all(files.map(async (file) => {

      const idImage = uuid.v4()
      const fileResize = await sharp(file.path)
        .resize({ height: 1920, width: 1080, fit: "contain" })
        .toBuffer()
      let fileKey = `publications-images-${idPublication}-${idImage}`
      await uploadFile(fileResize, fileKey, file.mimetype)

      // let newImagePublication = await imagesPublicationsService.createImage(idImage, fileKey, idPublication) // ORIGINAL
      let imageUrl = await getObjectSignedUrl(fileKey)
      let newImagePublication = await imagesPublicationsService.createImage(idImage, fileKey, idPublication, imageUrl)

      imagesKeys.push(newImagePublication.key_s3)
    }))
    await Promise.all(files.map(async (file) => {
      await unlinkFile(file.path)
    }))

    return response
      .status(200)
      .json({ results: { message: 'success upload', images: imagesKeys } });

  } catch (error) {
    if (files) {
      await Promise.all(files.map(async (file) => {
        await unlinkFile(file.path)
      }))
    }
    next(error)
  }
}

const destroyImageByPublication = async (request, response, next) => {
  try {
    const { idImage } = request.params;
    let imagePublication = await imagesPublicationsService.getImageOr404(idImage)
    await deleteFile(imagePublication.key_s3)
    await imagesPublicationsService.removeImage(idImage)
    return response.status(200).json({ message: 'Image Deleted', idPublication: imagePublication.publication_id, idImage: idImage })
  } catch (error) {
    next(error)
  }
}

const destroyAllImagesByPublication = async (request, response, next) => {
  try {
    let imagesPublications = []
    const { idPublication } = request.params
    let imagesPublication = await imagesPublicationsService.getImageByPublicationIdOr404(idPublication)
    await Promise.all(imagesPublication.map(async (imagePublication) => {
      await deleteFile(imagePublication.key_s3)
      await imagesPublicationsService.removeImage(imagePublication.id)
      imagesPublications.push({ idPublication: imagePublication.publication_id, idImage: imagePublication.id })
    }))
    return response.status(200).json({ message: 'Images Deleted', imagesPublications })
  } catch (error) {
    next(error)
  }
}

const getUrlAllImagesByPublication = async (request, response, next) => {
  try {
    const { idPublication } = request.params;
    const imagesPublication = await imagesPublicationsService.getImagesByPublicationsOr404(idPublication)
    // console.log(imagesPublication[1].key_s3)

    const imgPublications = await Promise.all(imagesPublication.map(async (imagePublication) => {
      let imageURL = await getObjectSignedUrl(imagePublication.key_s3)
      imagePublication.image_url = imageURL
      return imagePublication
    }))
  
    return response.status(200).json({ images: imgPublications })
  } catch (error) {
    next(error)
  }
}

const getFileImageByPublication = async (request, response, next) => {
  try {
    const { idImage } = request.params
    let imagePublication = await imagesPublicationsService.getImageOr404(idImage)
    const readStream = await getFileStream(imagePublication.key_s3)
    readStream
      .on('error', (e) => {
        next(e)
      })
      .pipe(response.status(200))
  } catch (error) {
    next(error)
  }
}

module.exports = {
  uploadImagePublication,
  destroyImageByPublication,
  destroyAllImagesByPublication,
  getUrlAllImagesByPublication,
  getFileImageByPublication
}