const express = require('express')
const router = express.Router()

const { getCities } = require('../controllers/cities.controller')

router.route('/')
  .get(getCities)//1


module.exports = router