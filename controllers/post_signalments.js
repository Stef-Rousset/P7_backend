const models = require('../models');
const getUserIdFromToken = require('../helpers/getUserIdFromToken');


exports.signalPost = async(req,res) => {
  try{
      const userId = await getUserIdFromToken(req.headers.authorization.split(' ')[1])
      const post = await models.Post.findOne({ where: { id: req.params.id}})
      await models.PostSignalment.create({
                                          userId: userId,
                                          postId: post.id
                                        })
      return res.status(201).json({ message: `Signalment created on post: ${post.title}` })

  } catch(error){
      return res.status(500).json({error: error.message})
  }
}
exports.getAllPostSignalments = async(req,res) => {
  try{
      const userId = await getUserIdFromToken(req.headers.authorization.split(' ')[1])
      const currentUser = await models.User.findOne({ where: { id: userId}})
      if (currentUser.role === 'admin'){
          const postSignalments = await models.PostSignalment.findAll()
          return res.status(200).json({ postSignalments: postSignalments})
      } else {
          return res.status(401).json({ message: "You are not allowed to perform this action" })
      }
  } catch(error){
      return res.status(500).json({error: error.message})
  }
}
exports.deletePostSignalment = async(req,res) => {
  try{
      const postSignalment = await models.PostSignalment.findOne({ where: { id: req.params.id }})
      const userId = await getUserIdFromToken(req.headers.authorization.split(' ')[1])
      const currentUser = await models.User.findOne({ where: { id: userId}})
      if (currentUser.role === 'admin'){
          postSignalment.destroy()
          return res.status(200).json({ message: "Post signalment deleted"})
      } else {
          return res.status(401).json({ message: "You are not allowed to perform this action" })
      }
  } catch(error){
      return resr.status(500).json({ error: error.message})
  }
}
