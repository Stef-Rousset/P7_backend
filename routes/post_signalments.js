const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const signalmentController = require('../controllers/post_signalments')


router.post('/posts/:id/post_signalments/new', auth, signalmentController.signalPost)
router.get('/post_signalments/index', auth, signalmentController.getAllPostSignalments )

module.exports = router;
