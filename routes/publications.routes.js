const express = require('express')
const router = express.Router()
const passportJWT = require('../libs/passport')
const checkValues= require('../middlewares/checkRequest.middleware')
const checkQueryParameters= require('../middlewares/checkQuery.middleware')
const checkParam = require('../middlewares/checkParams.middleware')

const { getPublications, getPublication, addPublication, removePublication } = require('../controllers/publications.controller')
const { addVote } = require('../controllers/votes.controller')

router.route('/')
  .get(checkQueryParameters,getPublications)
  .post(passportJWT.authenticate('jwt', { session: false }),checkValues,checkParam,addPublication)

router.route('/:idPublication')
  .get(checkParam,getPublication)
  .delete(passportJWT.authenticate('jwt', { session: false }),checkParam,removePublication)

router.route('/:idPublication/vote')
  .post(passportJWT.authenticate('jwt', { session: false }),checkParam,addVote)

module.exports = router