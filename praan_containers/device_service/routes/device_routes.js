const express = require('express')

const { isAuthenticateUser,authorizeRole } = require('../middleware/auth')
const router = express.Router()

//router.route('/user').post(createUser)

router.route('/device').post(require('../controllers/add_device').createUser)

router.route('/:device_id').get(require('../controllers/add_device').get_device)

router.route('').get(isAuthenticateUser,require('../controllers/add_device').get_all_device)


router.route('/:device_id').patch(require('../controllers/add_device').updateDevice)
module.exports = router