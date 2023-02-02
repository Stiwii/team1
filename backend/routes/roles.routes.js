const express = require('express')
const router = express.Router()
const passportJWT = require('../libs/passport')
const roleMiddleware= require('../middlewares/role.middleware')

const { getRoles } = require('../controllers/roles.controller')

router.route('/')
  .get(passportJWT.authenticate('jwt', { session: false }),roleMiddleware,getRoles)//2


module.exports = router