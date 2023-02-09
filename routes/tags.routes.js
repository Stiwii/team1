const express = require('express')
const  router = express.Router()
const passportJWT = require('../libs/passport')
const roleMiddleware= require('../middlewares/role.middleware')
const checkRequest= require('../middlewares/joiRequest.middleware')
const {querySchema,updateTagSchema } = require('../utils/validationSchemes')

const { getTags, addTag, updateTag, removeTag } = require('../controllers/tags.controller')



router.route('/')
  .get(checkRequest('query',querySchema),getTags) 
  .post(passportJWT.authenticate('jwt', { session: false }),roleMiddleware,addTag)


//? this route is administrative
router.route('/:idTag')
  .put(passportJWT.authenticate('jwt', { session: false }),roleMiddleware,checkRequest('body',updateTagSchema),updateTag)
  .delete(passportJWT.authenticate('jwt', { session: false }),roleMiddleware,removeTag) 

module.exports = router