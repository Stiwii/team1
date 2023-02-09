const express = require('express')
const router = express.Router()

const { getCities } = require('../controllers/cities.controller')
const checkRequest= require('../middlewares/joiRequest.middleware')
const { querySchema } = require('../utils/validationSchemes')

router.route('/')
  .get(checkRequest('query',querySchema),getCities)


module.exports = router