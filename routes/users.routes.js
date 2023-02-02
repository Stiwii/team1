const express = require('express')
const router = express.Router()
const passportJWT = require('../libs/passport')
const roleMiddleware= require('../middlewares/role.middleware')

const {
  getUsers,
  getUser,
  updateUser,
  getInfoUser,
  getEmail
} = require('../controllers/users.controller')

const { getVotes } = require('../controllers/votes.controller')
const {  getPublicationsofUser } = require('../controllers/publications.controller')

//? this route is administrave
router.route('/')
  .get(passportJWT.authenticate('jwt', { session: false }),roleMiddleware,getUsers) //1

// router.get('/mail/', getEmail) //2
router.get('/user-info', passportJWT.authenticate('jwt', { session: false }), getInfoUser) //1

//? this routes is for users loged
router.route('/:id')
  .get(passportJWT.authenticate('jwt', { session: false }),getUser)//2
  .put(passportJWT.authenticate('jwt', { session: false }),updateUser) //1
// router.delete('/:id', removeUser)

router.route('/:id/votes')
  .get(passportJWT.authenticate('jwt', { session: false }),getVotes)//2

router.route('/:id/publications')
  .get(passportJWT.authenticate('jwt', { session: false }),getPublicationsofUser)//1

module.exports = router