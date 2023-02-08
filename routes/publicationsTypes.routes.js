const express = require('express')
const router = express.Router()
const checkParam = require('../middlewares/checkParams.middleware')
const checkQueryParameters= require('../middlewares/checkQuery.middleware')

const { getPublicationsTypes, getPublicationType } = require('../controllers/publications_types.controller')

router.route('/')
  .get(checkQueryParameters,getPublicationsTypes)

router.route('/:idPublicationType')
  .get(checkParam,getPublicationType) 

module.exports = router