const AuthService = require('../services/auth.service')
const UsersService = require('../services/users.service')
const CustomError = require('../utils/custom-error')
const jwt = require('jsonwebtoken')
const mailer = require('../utils/mailer')
require('dotenv').config()

const authService = new AuthService()
const usersService = new UsersService()

const logIn = async (request, response, next) => {
  const { email, password } = request.body
  try {
    const user = await authService.checkUsersCredentials(email, password)
    const token = jwt.sign({
      id: user.id,
      email: user.email,
      role: user.profile[1].role.name,
      profileId: user.profile[0].id
    }, process.env.JWT_SECRET_WORD,
    { expiresIn: '24h' })

    if (user.profile[1]) {
      const tokenAdmin = jwt.sign({
        id: user.id,
        email: user.email,
        role: user.profile[0].role.name,
        profileId: user.profile[1].id
      }, process.env.JWT_SECRET_WORD,
      { expiresIn: '24h' })

      response.status(200).json({
        message: 'Correct Credentials!',
        token: [{ 'public': token, 'admin': tokenAdmin }]
      })
    }
    response.status(200).json({
      message: 'Correct Credentials!',
      token: [{ 'public': token }]
    })
  }
  catch (error) {
    next(error)
  }
}

// const verifyUser = async (request, response, next) => {
//   const id = request.params.id
//   try {
//     const user = await authService.getInfo(id)
//     if (user) {
//       response.status(200).json({ message: 'Verify user succesfully!' })
//     } else {
//       response.status(400).json({ message: 'Already verified user' })
//     }
//   } catch (error) {
//     next(error)
//   }
// }

const forgetPassword = async (request, response, next) => {
  const { email } = request.body
  try {
    let errorCounter = 0
    let errorMessage = null
    let userTokenEmail = await authService.createRecoveryToken(email)
    let user = await usersService.setTokenUser(userTokenEmail.user.id, userTokenEmail.token)
    try {
      mailer.sendMail({
        from: process.env.MAIL_SEND,
        to: user.email,
        subject: 'Restore Password ',
        html: `<span>${process.env.DOMAIN}api/v1/auth/change-password/${userTokenEmail.token}</span>`
        // html: `<a href='${process.env.HOST_CLOUD}/api/v1/auth/change-password/${userTokenEmail.token}'>Restore password</a>`
      })
    } catch (error) {
      errorCounter += 1
      errorMessage = 'Error to send email'
    }
    return response.status(200).json({ results: { message: 'Email sended!, Check your inbox', errors: { counter: errorCounter, message: errorMessage } } })

  } catch (error) {
    next(error)
  }
}

const restorePassword = async (request, response, next) => {
  const { password } = request.body
  try {
    let payloadToken
    try {
      payloadToken = JSON.parse(atob((request.params.token).split('.')[1]))
    } catch (error) {
      throw new CustomError(`Token ${error.name} : ${error.message}`, 401, 'Unauthorized')
    }
    await authService.changePassword(payloadToken, password, (request.params.token))
    response.status(200).json({ message: 'update success' })
  } catch (error) {
    next(error)
  }
}


module.exports = {
  logIn,
  // verifyUser,
  forgetPassword,
  restorePassword
}