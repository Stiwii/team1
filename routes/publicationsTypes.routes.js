const express = require('express')
const router = express.Router()

const { getPublicationsTypes, getPublicationType } = require('../controllers/publications_types.controller')
const checkRequest= require('../middlewares/joiRequest.middleware')
const {querySchema } = require('../utils/validationSchemes')
router.route('/')
  .get(checkRequest('query',querySchema),getPublicationsTypes)

router.route('/:idPublicationType')
  .get(getPublicationType) 

module.exports = router