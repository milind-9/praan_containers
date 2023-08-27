const express = require('express')

const { isAuthenticateUser,authorizeRole } = require('../middleware/auth')
const router = express.Router()

//router.route('/user').post(createUser)

router.route('/login').post(require('../controllers/login').loginUser)

router.route('/signup').post(require('../controllers/login').createUser)


module.exports = router