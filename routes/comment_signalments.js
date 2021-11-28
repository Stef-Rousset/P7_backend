const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const signalmentController = require('../controllers/comment_signalments')


router.post('/posts/:id/comment/:commentId/comment_signalments/new', auth, signalmentController.signalComment)
router.get('/comment_signalments/index', auth, signalmentController.getAllCommentSignalments )

module.exports = router;
