const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const postController = require('../controllers/post')

router.post('/new', auth, postController.createPost)
router.get('/index', auth, postController.getAllPosts)
router.get('/show/:id', auth, postController.getOnePost)
router.get('/mostLikes', auth, postController.getMostLikesPosts)
router.get('/latest', auth, postController.getLatestPosts)
router.put('/edit/:id', auth, postController.updatePost)
router.delete('/delete/:id', auth, postController.deletePost)

module.exports = router;
