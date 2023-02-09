const express = require('express')
const router = express.Router()

const { getStates } = require('../controllers/states.controller')
const checkRequest= require('../middlewares/joiRequest.middleware')
const { querySchema } = require('../utils/validationSchemes')

router.route('/')
  .get(checkRequest('query',querySchema),getStates)


module.exports = router