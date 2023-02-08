const express = require('express')
const routesUsers = require('./users.routes')

// const isAuthenticatedByPassportJwt = require('../libs/passport')

const routesPublications = require('./publications.routes')
const routesPublicationsTypes = require('./publicationsTypes.routes')
const routesCities = require('./cities.routes')
const routesStates = require('./states.routes')
const routesAuth = require('./auth.routes')
const routesRoles = require('./roles.routes')
const routesTags = require('./tags.routes')

function routerModels(app) {
  const router = express.Router()

  app.use('/api/v1', router)
  router.use('/auth', routesAuth)
  router.use('/users', routesUsers)
  // router.use('/users', isAuthenticatedByPassportJwt.authenticate('jwt', {session: false}) ,routesUsers)//<- middleware here
  // other models here

  // router.use('/profiles', routesProfiles)
  router.use('/publications-types', routesPublicationsTypes)
  router.use('/publications', routesPublications)
  router.use('/states', routesStates)
  router.use('/roles', routesRoles)
  router.use('/cities', routesCities)
  router.use('/tags', routesTags)
}

module.exports = routerModels
