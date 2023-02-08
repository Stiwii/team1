const express = require('express')
const router = express.Router()
const passportJWT = require('../libs/passport')
const roleMiddleware= require('../middlewares/role.middleware')
const checkValues= require('../middlewares/checkRequest.middleware')

const {
  getUsers,
  getUser,
  updateUser,
  getInfoUser
} = require('../controllers/users.controller')

const { getVotes } = require('../controllers/votes.controller')
const {  getPublicationsofUser } = require('../controllers/publications.controller')
const checkQueryParameters= require('../middlewares/checkQuery.middleware')

//? this route is administrave
router.route('/')
  .get(passportJWT.authenticate('jwt', { session: false }),roleMiddleware,checkQueryParameters,getUsers) 

router.get('/user-info', passportJWT.authenticate('jwt', { session: false }), getInfoUser) 
//? this routes is for users loged
router.route('/:idUSer')
  .get(passportJWT.authenticate('jwt', { session: false }),checkValues,getUser)
  .put(passportJWT.authenticate('jwt', { session: false }),checkValues,updateUser) 


router.route('/:idUSer/votes')
  .get(passportJWT.authenticate('jwt', { session: false }),checkValues,checkQueryParameters,getVotes)

router.route('/:idUSer/publications')
  .get(passportJWT.authenticate('jwt', { session: false }),checkValues,checkQueryParameters,getPublicationsofUser)

module.exports = router