const express = require('express')
const router = express.Router()
const passportJWT = require('../libs/passport')
const roleMiddleware= require('../middlewares/role.middleware')
const checkRequest= require('../middlewares/joiRequest.middleware')
const {querySchema } = require('../utils/validationSchemes')

const { getRoles } = require('../controllers/roles.controller')

router.route('/')
  .get(checkRequest('query',querySchema),getRoles)


module.exports = router