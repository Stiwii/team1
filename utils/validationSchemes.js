const Joi = require("joi");

const signupSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
})

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
})

const recoverPasswordSchema = Joi.object({
  email: Joi.string().email().required()
})

const restorePasswordSchema = Joi.object({
    password: Joi.string().required()
})

const uuidSchema = Joi.object({
  uuid : Joi.string().guid().required()
})
const serialSchema = Joi.object({
  serial : Joi.number().required()
})
const tokenSchema = Joi.object({
  token : Joi.string().regex(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]*$/).required()
})

module.exports = {
  signupSchema,
  loginSchema,
  recoverPasswordSchema,
  restorePasswordSchema,
  tokenSchema
}