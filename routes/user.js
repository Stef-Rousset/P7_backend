const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')
const userController = require('../controllers/user')


router.post('/signup', userController.signup)
router.post('/login', userController.login)
router.get('/profile/:id', auth, multer, userController.getProfile)
router.put('/profile/:id', auth, multer, userController.updateProfile)
router.delete('/profile/:id', auth, multer, userController.deleteProfile)

module.exports = router;
