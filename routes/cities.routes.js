const express = require('express')
const router = express.Router()

const { getCities } = require('../controllers/cities.controller')
const checkQueryParameters= require('../middlewares/checkQuery.middleware')

router.route('/')
  .get(checkQueryParameters,getCities)


module.exports = router