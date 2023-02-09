const express = require('express')
const router = express.Router()
const passportJWT = require('../libs/passport')
const roleMiddleware= require('../middlewares/role.middleware')
const checkRequest= require('../middlewares/joiRequest.middleware')
const { querySchema } = require('../utils/validationSchemes')

const {
  getUsers,
  getUser,
  updateUser,
  getInfoUser
} = require('../controllers/users.controller')

const { getVotes } = require('../controllers/votes.controller')
const {  getPublicationsofUser } = require('../controllers/publications.controller')

//? this route is administrave
router.route('/')
  .get(passportJWT.authenticate('jwt', { session: false }),roleMiddleware,checkRequest('query',querySchema),getUsers) 

router.get('/user-info', passportJWT.authenticate('jwt', { session: false }), getInfoUser) 
//? this routes is for users loged
router.route('/:idUSer')
  .get(passportJWT.authenticate('jwt', { session: false }),getUser)
  .put(passportJWT.authenticate('jwt', { session: false }),updateUser) 


router.route('/:idUSer/votes')
  .get(passportJWT.authenticate('jwt', { session: false }),checkRequest('query',querySchema),getVotes)

router.route('/:idUSer/publications')
  .get(passportJWT.authenticate('jwt', { session: false }),checkRequest('query',querySchema),getPublicationsofUser)

module.exports = router