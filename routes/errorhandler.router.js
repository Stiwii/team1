const express = require('express')
require('dotenv').config();

const { logErrors, handlerAuthError, errorHandler, ormErrorHandler } = require('../middlewares/error.handler')
// const { Sentry } = require('../libs/sentry')

function routerErrorHandler(app) {
  /* Apply Middlewares */
  app.use(logErrors)
  app.use(handlerAuthError)
  app.use(ormErrorHandler)
  app.use(errorHandler)
  // if (process.env.NODE_ENV === 'production') app.use(Sentry.Handlers.errorHandler());

  app.use('*', async (request, response) => {
    try {
      return response.status(404).send('Page Not Found');
    } catch (error) {
      return response.status(404).send('Error loading page not found');
    }
  });
}

module.exports = routerErrorHandler;
