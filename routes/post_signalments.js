const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const signalmentController = require('../controllers/post_signalments')


router.post('/posts/post_signalments/new', auth, signalmentController.signalPost)
router.get('/post_signalments/index', auth, signalmentController.getAllPostSignalments )
router.delete('/post_signalments/:id', auth, signalmentController.deletePostSignalment)

module.exports = router;
