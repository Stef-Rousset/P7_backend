const models = require('../models');
require('dotenv').config();
const jwt = require('jsonwebtoken');


function getUserIdFromToken(token) {
    const decodedToken = jwt.verify(token, process.env.TOKENSECRET) // decodage du token
    const userId = decodedToken.userId   // recup de l'id
    return userId
}

exports.signalComment = async(req,res) => {
  try{
      const userId = await getUserIdFromToken(req.headers.authorization.split(' ')[1])
      const comment = await models.Comment.findOne({ where: { id: req.params.commentId}})
      const commentWrittenBy = await models.User.findOne({ where: { id: comment.userId}})
      await models.CommentSignalment.create({
                                          userId: userId,
                                          commentId: comment.id
                                        })
      return res.status(201).json({ message: `Signalment created on comment written by: ${commentWrittenBy.firstName} ${commentWrittenBy.lastName}` })

  } catch(error){
      return res.status(500).json({error: error.message})
  }
}
exports.getAllCommentSignalments = async(req,res) => {
  try{
      const userId = await getUserIdFromToken(req.headers.authorization.split(' ')[1])
      const currentUser = await models.User.findOne({ where: { id: userId}})
      if (currentUser.role === 'admin'){
          const commentSignalments = await models.CommentSignalment.findAll()
          return res.status(200).json({ commentSignalments: commentSignalments})
      } else {
          return res.status(401).json({ message: "You are not allowed to perform this action" })
      }
  } catch(error){
      return res.status(500).json({error: error.message})
  }
}
