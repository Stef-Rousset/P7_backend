const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const postController = require('../controllers/post')

router.post('/new', auth, postController.createPost)
router.get('/index', auth, postController.getAllPosts)
router.get('/show/:id', auth, postController.getOnePost)
router.delete('/delete/:id', auth, postController.deletePost)
router.post('/like', auth, postController.likePost)
router.get('/:id/comments', auth, postController.getAllComments)
router.post('/:id/comment', auth, postController.createComment)
router.delete('/comment/:commentId', auth, postController.deleteComment)


module.exports = router;
