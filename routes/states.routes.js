const express = require('express')
const router = express.Router()

const { getStates } = require('../controllers/states.controller')
const checkQueryParameters= require('../middlewares/checkQuery.middleware')


router.route('/')
  .get(checkQueryParameters,getStates)


module.exports = router