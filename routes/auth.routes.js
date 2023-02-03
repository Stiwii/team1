const express = require('express')
const router = express.Router()

const { logIn,forgetPassword,restorePassword } = require('../controllers/auth.controller')

const { registerUser } = require('../controllers/users.controller')

router.post('/login', logIn) //1 complete
router.post('/sign-up', registerUser) //2

// router.post('/forget-password', forgetPassword) //DEMO

// router.post('/change-password/:token', restorePassword) //DEMO

// router.post('/update-password', authServices.postRecoveryToken)
// router.patch('/recovery-password/:id', authServices.patchPassword)
// router.get('/verify-user/:id', verifyUser)

module.exports = router
