const { ValidationError, DatabaseError, BaseError,
  ConnectionError, ConnectionAcquireTimeoutError, ConnectionRefusedError, ConnectionTimedOutError, InvalidConnectionError
} = require('sequelize')
function logErrors(err, req, res, next) {
  console.error(err)
  next(err)
}
function errorHandler(err, req, res, next) {
  let { status } = err
  if(!status){
    status=500
  }
  return res.status(status).json({
    statusCode: status,
    message: err.message,
    errorName: err.name,
    // stack: err.stack, //! es hubicacion del error segun recuerda ian
  })
}
function handlerAuthError(err, req, res, next) {
  if (err.status === 401 || err.status === 403) {
    return res.status(err.status).json({
      statusCode: err.status,
      errorName: err.name,
      message: err.message,
      // errors: err.errors,
      // stack: err.stack,
      // code: err.code,
    });
  }
  //   if (err.name === "CustomName")
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({
      statusCode: err.status,
      errorName: err.name,
      message: err.message,
      // errors: err.errors,
      // stack: err.stack,
      // code: err.code,
    });
  }
  // if (err.name === "Error Testing") {
  //   return res.status(401).json({
  //     errorName: err.name,
  //     message: err.message,
  //     errors: err.errors,
  //     // stack: err.stack,
  //     code: err.code,
  //   });
  // }
  next(err);
}
function ormErrorHandler(err, req, res, next) {
  if (
    err instanceof ConnectionError ||
    err instanceof ConnectionAcquireTimeoutError ||
    err instanceof ConnectionRefusedError ||
    err instanceof ConnectionTimedOutError ||
    err instanceof InvalidConnectionError
  ) {
    return res.status(409).json({
      statusCode: 409,
      errorName: err.name,
      message: err.message
    });
  }
  if (err instanceof ValidationError) {
    return res.status(409).json({
      statusCode: 409,
      errorName: err.name,
      message: err.message,
      // errors: err.errors
    });
  }
  if (err instanceof DatabaseError) {
    return res.status(409).json({
      statusCode: 409,
      errorName: err.name,
      message: err.message,
      // errorOriginal: err['original'],
      // parametros: err['parameters'],
      // errors: err.errors,
      // sql: err['sql'],
      // stack: err.stack,
    });
  }
  if (err instanceof BaseError) {
    return res.status(409).json({
      statusCode: '409',
      errorName: err.name,
      message: err.message,
      // errorOriginal: err['original'],
      // parametros: err['parameters'],
      // errors: err.errors,
      // sql: err['sql'],
      // stack: err.stack,
    });
  }
  next(err);
}
module.exports = { logErrors, handlerAuthError, errorHandler, ormErrorHandler }