const express = require('express')
const router = express.Router()
const passportJWT = require('../libs/passport')

const { multerPublicationsPhotos } = require('../middlewares/multer.middleware')
const { 
  uploadImagePublication,
  getImagesByPublication,
  destroyAllImagesByPublication,
  getFileImageByPublication, 
  destroyImageByPublication } = require('../controllers/images_publications.controller')
const { getPublications, getPublication, addPublication, removePublication } = require('../controllers/publications.controller')
const { addVote } = require('../controllers/votes.controller')
const checkRequest = require('../middlewares/joiRequest.middleware')
const { addPublicationSchema, querySchema } = require('../utils/validationSchemes')

router.route('/')
  .get(checkRequest('query', querySchema), getPublications)
  .post(passportJWT.authenticate('jwt', { session: false }), checkRequest('body', addPublicationSchema), addPublication)

router.route('/:idPublication')
  .get(getPublication)
  .delete(passportJWT.authenticate('jwt', { session: false }), removePublication)

router.route('/:idPublication/vote')
  .post(passportJWT.authenticate('jwt', { session: false }), addVote)

router.route('/:idPublication/upload-image')
  .post(multerPublicationsPhotos.array('image', 2), uploadImagePublication)
  .get(getFileImageByPublication)

router.route('/:idPublication/remove-image/:idImage')
  .delete(destroyImageByPublication)
router.route('/:idPublication/remove-images')
  .delete(destroyAllImagesByPublication)


module.exports = router