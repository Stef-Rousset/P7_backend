const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const postController = require('../controllers/post')

router.post('/new', auth, postController.createPost)
router.get('/index', auth, postController.getAllPosts)
router.get('/my_posts', auth, postController.getAllPostsOfOneUSer)
router.get('/show/:id', auth, postController.getOnePost)
router.get('/latest', auth, postController.getLatestPosts)
router.put('/edit/:id', auth, postController.updatePost)
router.delete('/delete/:id', auth, postController.deletePost)
router.post('/like', auth, postController.likePost)
router.get('/:id/likes', auth, postController.getTotalLikes)
router.get('/:id/dislikes', auth, postController.getTotalDislikes)
router.post('/:id/comment', auth, postController.createComment)
router.delete('/:id/comment/:commentId', auth, postController.deleteComment)


module.exports = router;
