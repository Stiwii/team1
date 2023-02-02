const express = require('express')
const router = express.Router()

const { getPublicationsTypes, getPublicationType } = require('../controllers/publications_types.controller')

router.route('/')
  .get(getPublicationsTypes)//2

router.route('/:id')
  .get(getPublicationType) //1

module.exports = router