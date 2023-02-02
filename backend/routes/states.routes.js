const express = require('express')
const router = express.Router()

const { getStates } = require('../controllers/states.controller')


router.route('/')
  .get(getStates)//1


module.exports = router