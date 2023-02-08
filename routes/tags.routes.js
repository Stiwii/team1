const express = require('express')
const  router = express.Router()
const passportJWT = require('../libs/passport')
const roleMiddleware= require('../middlewares/role.middleware')
const checkValues= require('../middlewares/checkRequest.middleware')
const checkParam= require('../middlewares/checkParams.middleware')
const checkQueryParameters= require('../middlewares/checkQuery.middleware')


const { getTags, addTag, updateTag, removeTag } = require('../controllers/tags.controller')



router.route('/')
  .get(checkQueryParameters,getTags) 
  .post(passportJWT.authenticate('jwt', { session: false }),roleMiddleware,checkValues, addTag)//?this route is administrative  


//? this route is administrative
router.route('/:idTag')
  .put(passportJWT.authenticate('jwt', { session: false }),roleMiddleware,checkValues,checkParam,updateTag)
  .delete(passportJWT.authenticate('jwt', { session: false }),roleMiddleware,checkParam,removeTag) 

module.exports = router