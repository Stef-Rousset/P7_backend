const models = require('../models');
require('dotenv').config();
const jwt = require('jsonwebtoken');
require('dotenv').config();


function getUserIdFromToken(token) {
    const decodedToken = jwt.verify(token, process.env.TOKENSECRET) // decodage du token
    const userId = decodedToken.userId   // recup de l'id
    return userId
}
exports.getAllPosts = async(req, res) => {
  try {
      const posts = await models.Post.findAll()
      return res.status(200).json(posts)
  } catch(error){
      return res.status(500).json({ error: error.message })
  }
}
exports.getOnePost = async(req, res) => {
  try {
      const post = await models.Post.findOne( { where: { id: req.params.id}})
      return res.status(200).json( { post: post })
  } catch(error){
      return res.status(500).json({ error: error.message })
  }
}
exports.createPost = async(req, res) => {
  try {
      const post = await models.Post.create({
                                              title: req.body.title,
                                              content: req.body.content,
                                              userId: req.body.userId
                                            })
      return res.status(200).json( { post: post })
  } catch(error){
      return res.status(500).json({ error: error.message })
  }
}
exports.updatePost = async(req, res) => {
  try {
      const post = await models.Post.findOne({ where: { id: req.params.id}})
      post.update({
                    title: req.body.title,
                    content: req.body.content,
                    userId: req.body.userId
                  })
      return res.status(200).json( { post: post, message: `${post.title} updated` })
  } catch(error){
      return res.status(500).json({ error: error.message })
  }
}
exports.deletePost = async(req, res) => {
  try {
      const userId = await getUserIdFromToken(req.headers.authorization.split(' ')[1]) //recup du token ds les headers
      const user = await models.User.findOne({ where: { id: userId }})
      if (user.role === 'admin'){
          const post = await models.Post.findOne({ where: { id: req.params.id}})
          post.destroy()
          return res.status(200).json( { message: `${post.title} deleted` })
      } else {
          return res.status(401).json({ message: "You are not allowed to perform this action"})
      }
  } catch(error){
      return res.status(500).json({ error: error.message })
  }
}
exports.getLatestPosts = async (req, res) => {
  try {
    const latestPosts = await models.Post.findAll({ order: [ [ "createdAt", "DESC" ] ]})
      return res.status(200).json(latestPosts)
  } catch (error) {
      return res.status(500).json({ error: error.message })
  }
}
exports.likePost = async(req, res) => {
  try{
      const post = await models.Post.findOne({ where: { id: req.params.id} })
      const like = await models.Like.findOne({ where: { postId: req.params.id, userId: req.body.userId }})
      // si l'instance de like n'existe pas , on la crée
      if (!like){
          const newLike = await models.Like.create({
                                                    status: req.body.status,
                                                    postId: post.id,
                                                    userId: req.body.userId
                                                  })
          return res.status(201).json({ message: `${newLike.status} added to post: ${post.title} ` })
      // si l'instance de like existe, on l'update
      } else {
          await like.update({
                            status: req.body.status
                            })
          return res.status(200).json({ message: `Like status modified on post: ${post.title} ` })
      }
  } catch (error){
        return res.status(500).json({ error: error.message})
  }
}
exports.getTotalLikes = async(req,res) => {
    try {
        const post = await models.Post.findOne({ where: { id: req.params.id} })
        const totalLikes = await models.Like.count({ where: { postId: post.id, status: 'like' } })
        return res.status(200).json({totalLikes: totalLikes})
    } catch (error){
        return res.status(500).json({ error: error.message})
  }
}
exports.getTotalDislikes = async(req,res) => {
    try{
        const post = await models.Post.findOne({ where: { id: req.params.id} })
        const totalDislikes = await models.Like.count({ where: { postId: post.id, status: 'dislike' } })
        return res.status(200).json({ totalDislikes: totalDislikes })
    } catch (error){
        return res.status(500).json({ error: error.message})
  }
}
exports.createComment = async(req, res) => {
  try {
      const post = await models.Post.findOne({ where: { id: req.params.id}})
      const comment = await models.Comment.create({
                                              content: req.body.content,
                                              userId: req.body.userId,
                                              postId: post.id
                                            })
      return res.status(200).json( { comment: comment, message: `Comment added to post: ${post.title}` })
  } catch(error){
      return res.status(500).json({ error: error.message })
  }
}
exports.deleteComment = async(req, res) => {
  try {
      const userId = await getUserIdFromToken(req.headers.authorization.split(' ')[1]) //recup du token ds les headers
      const user = await models.User.findOne({ where: { id: userId }})
      if (user.role === 'admin'){
          const comment = await models.Comment.findOne({ where: { id: req.params.commentId }})
          comment.destroy()
          return res.status(200).json({ message: "Comment deleted" })
      } else {
          return res.status(401).json({ message: "You are not allowed to perform this action"})
      }
  } catch(error) {
      return res.status(500).json({ error: error.message})
  }
}