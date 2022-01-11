const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')
const userController = require('../controllers/user')


router.post('/signup', userController.signup)
router.post('/login', userController.login)
router.get('/profile', auth, multer, userController.getProfile)
router.put('/profile', auth, multer, userController.updateProfile)
router.delete('/profile', auth, multer, userController.deleteProfile)

module.exports = router;
