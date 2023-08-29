const express = require('express')
const multer = require('multer');
const { isAuthenticateUser,authorizeRole } = require('../middleware/auth')
const router = express.Router()

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.route('/device').post(isAuthenticateUser,require('../controllers/add_device').createUser)

router.route('/:device_id').get(isAuthenticateUser,require('../controllers/add_device').get_device)

router.route('').get(isAuthenticateUser,require('../controllers/add_device').get_all_device)


router.route('/:device_id').patch(isAuthenticateUser,require('../controllers/add_device').updateDevice)

router.route('/upload').post(upload.single('file'),isAuthenticateUser,require('../controllers/csv').upload_data)
module.exports = router
