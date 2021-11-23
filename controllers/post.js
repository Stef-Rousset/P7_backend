const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const models = require('../models');

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
      const user = await models.User.findOne( { where: { id: req.body.userId } } )
      const post = await models.Post.create({
                                              title: req.body.title,
                                              content: req.body.content,
                                              userId: user.id
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
      const post = await models.Post.findOne({ where: { id: req.params.id}})
      post.destroy()
      return res.status(200).json( { post: post, message: `${post.title} deleted` })
  } catch(error){
      return res.status(500).json({ error: error.message })
  }
}
exports.getMostLikesPosts = async (req, res) => {
  try {
      const mostLikesPosts = await models.Post.findAll({ order: [ [ Like, "quantity", "DESC" ] ] })
      return res.status(200).json(mostLikesPosts)
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
