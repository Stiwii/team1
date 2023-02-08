const express = require('express')
const router = express.Router()
const checkRequest = require('../middlewares/joiRequest.middleware')

const { logIn,forgetPassword,restorePassword } = require('../controllers/auth.controller')
const { signupSchema,loginSchema,recoverPasswordSchema,restorePasswordSchema,tokenSchema } = require('../utils/validationSchemes')

const { registerUser } = require('../controllers/users.controller')

router.post('/login',checkRequest('body',loginSchema), logIn) 
router.post('/sign-up',checkRequest('body',signupSchema), registerUser) 

router.post('/forget-password',checkRequest('body',recoverPasswordSchema), forgetPassword) 

router.post('/change-password/:token',checkRequest('params',tokenSchema),checkRequest('body',restorePasswordSchema), restorePassword) 

// router.post('/update-password', authServices.postRecoveryToken)
// router.patch('/recovery-password/:id', authServices.patchPassword)
// router.get('/verify-user/:id', verifyUser)

module.exports = router
