const express = require('express')
const router = express.Router()
const passportJWT = require('../libs/passport')

const { getPublications, getPublication, addPublication, removePublication } = require('../controllers/publications.controller')
const { addVote } = require('../controllers/votes.controller')

router.route('/')
  .get(getPublications)//2
  .post(passportJWT.authenticate('jwt', { session: false }),addPublication)//1

router.route('/:id')
  .get(getPublication)//2
  .delete(passportJWT.authenticate('jwt', { session: false }),removePublication)//1

router.route('/:id/votes')
  .get(passportJWT.authenticate('jwt', { session: false }),addVote)//2

module.exports = router