// const passportJWT = require('../middlewares/auth.middleware')

const JwtStrategy = require('passport-jwt').Strategy
const { ExtractJwt } = require('passport-jwt')
const passport = require('passport')
require('dotenv').config()

const UsersService = require('../services/users.service')
const usersService = new UsersService() 

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
  secretOrKey: process.env.JWT_SECRET_WORD
}

passport.use(
  new JwtStrategy(options, (tokenDecoded, done) => {
    usersService.getUserOr404(tokenDecoded.id)
      .then((user) => {
        if (user) {
          done(null, tokenDecoded) //? Caso Exitoso, porque el usuario si existe
        } else {
          done(null, false) //? Caso fallido, en el que no genera error, pero no existe el usuario
        }
      })
      .catch((err) => {
        done(err, false) //? Caso fallido, en el que si genera un error
      })
  })
)

module.exports = passport
