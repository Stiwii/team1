const UsersService = require('../services/users.service')
const mailer = require('../utils/mailer')
const { getPagination, getPagingData } = require('../utils/sequelize-utils')

require('dotenv').config()

const usersService = new UsersService()

const getUsers = async (request, response, next) => {
  try {
    let query = request.query
    let { page, size } = query
    const { limit, offset } = getPagination(page, size, '10')
    query.limit = limit
    query.offset = offset

    let users = await usersService.findAndCount(query)
    const results = getPagingData(users, page, limit)
    return response.json({ results: results })

  } catch (error) {
    next(error)
  }
}

const addUser = async (request, response, next) => {
  try {
    let { body } = request
    let user = await usersService.createUser(body)
    return response.status(201).json({ results: user })
  } catch (error) {
    next(error)
  }
}

const registerUser = async (request, response, next) => {
  try {
    let { body } = request
    let errorCounter = 0
    let errorMessage = null
    let user = await usersService.setUser(body)
    try {
      await mailer.sendMail({
        from: process.env.MAIL_SEND,
        to: user.email,
        subject: `Verify account ${user.firstName} `,
        html: `<h1>Enter the following link to verify your account: ${process.env.DOMAIN}/api/v1/auth/verify-user/${user.id}</h1> `,
        text: 'Thanks you',
      })
    } catch (error) {
      errorCounter += 1
      errorMessage = 'Error to send email'
    }
    return response.status(201).json({ results: user, errors: { counter: errorCounter, message: errorMessage} })
  } catch (error) {
    next(error)
  }
}

const getUser = async (request, response, next) => {
  try {
    let { id } = request.params
    let users = await usersService.getMyUser(id)
    return response.json({ results: users })

  } catch (error) {
    next(error)
  }
}

const getInfoUser = async (request, response, next) => {
  try {
    let id = request.user.id
    let user = await usersService.getInfo(id)
    return response.json({ results: user })
  } catch (error) {
    next(error)
  }
}

const getEmail = async (request, response, next) => {
  try {
    let { email } = request.body
    let users = await usersService.getUserByEmail(email)
    return response.json({ results: users })
  } catch (error) {
    next(error)
  }
}

const updateUser = async (request, response, next) => {
  try {
    let { id } = request.params
    let profile_id = request.user.profileId
    if (id == request.user.id) {
      let { username, first_name, last_name, image_url, code_phone, phone } = request.body
      let user = await usersService.updateUser(id, { profile_id, username, first_name, last_name, image_url, code_phone, phone })
      return response.status(200).json({ result: user })
    }
  } catch (error) {
    next(error)
  }
}


const removeUser = async (request, response, next) => {
  try {
    let { id } = request.params
    let user = await usersService.removeUser(id)
    return response.json({ results: user, message: 'removed' })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getUsers,
  addUser,
  registerUser,
  getUser,
  updateUser,
  removeUser,
  getEmail,
  getInfoUser
}