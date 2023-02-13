const express = require('express')
const router = express.Router()
const passportJWT = require('../libs/passport')

const { addPublicationSchema, querySchema } = require('../utils/validationSchemes')

const { multerPublicationsPhotos } = require('../middlewares/multer.middleware')
const checkMyPublication = require('../middlewares/checkMyPublication.middleware')
const checkRequest = require('../middlewares/joiRequest.middleware')

const {
  uploadImagePublication,
  getUrlAllImagesByPublication,
  destroyAllImagesByPublication,
  getFileImageByPublication,
  destroyImageByPublication } = require('../controllers/images_publications.controller')
const { getPublications, getPublication, addPublication, removePublication } = require('../controllers/publications.controller')
const { addVote } = require('../controllers/votes.controller')

router.route('/')
  .get(checkRequest('query', querySchema), getPublications)
  .post(passportJWT.authenticate('jwt', { session: false }), checkRequest('body', addPublicationSchema), addPublication)

router.route('/:idPublication')
  .get(getPublication)
  .delete(passportJWT.authenticate('jwt', { session: false }), removePublication)

router.route('/:idPublication/vote')
  .post(passportJWT.authenticate('jwt', { session: false }), addVote)

router.route('/:idPublication/images')
  .get(getUrlAllImagesByPublication)
  .post(passportJWT.authenticate('jwt', { session: false }), checkMyPublication, multerPublicationsPhotos.array('image', 3), uploadImagePublication)
  .delete(passportJWT.authenticate('jwt', { session: false }), checkMyPublication, destroyAllImagesByPublication)

router.route('/:idPublication/images/:idImage')
  .get(getFileImageByPublication)
  .delete(passportJWT.authenticate('jwt', { session: false }), checkMyPublication, destroyImageByPublication)
  
module.exports = router