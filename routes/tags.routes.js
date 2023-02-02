const express = require('express')
const  router = express.Router()
const passportJWT = require('../libs/passport')
const roleMiddleware= require('../middlewares/role.middleware')


const { getTags, addTag, updateTag, removeTag } = require('../controllers/tags.controller')



router.route('/')
  .get(getTags) //? this route is piblic  //2
  .post(passportJWT.authenticate('jwt', { session: false }),roleMiddleware, addTag)//?this route is administrative  //1


//? this route is administrative
router.route('/:id')
  .put(passportJWT.authenticate('jwt', { session: false }),roleMiddleware,updateTag)// 2
  .delete(passportJWT.authenticate('jwt', { session: false }),roleMiddleware,removeTag) //1

module.exports = router