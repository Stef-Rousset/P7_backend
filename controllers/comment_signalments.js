const models = require('../models');
const getUserIdFromToken = require('../helpers/getUserIdFromToken');


exports.signalComment = async(req,res) => {
  try{
      const userId = await getUserIdFromToken(req.headers.authorization.split(' ')[1])
      const comment = await models.Comment.findOne({ where: { id: req.body.id}})
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
          const commentSignalments = await models.CommentSignalment.findAll({
            include: [
            { model: models.User,
              attributes: ["firstName", "lastName"]
            },
            { model: models.Comment,
              attributes: ["content"]
            }]
          })
          return res.status(200).json({ commentSignalments: commentSignalments})
      } else {
          return res.status(401).json({ message: "You are not allowed to perform this action" })
      }
  } catch(error){
      return res.status(500).json({error: error.message})
  }
}
exports.deleteCommentSignalment = async(req,res) => {
  try{
      const commentSignalment = await models.CommentSignalment.findOne({ where: { id: req.params.id }})
      // on récupère l'id du comment pour supprimer tous les signalements de ce comment
      const commentId = commentSignalment.commentId
      const userId = await getUserIdFromToken(req.headers.authorization.split(' ')[1])
      const currentUser = await models.User.findOne({ where: { id: userId}})
      if (currentUser.role === 'admin'){
          models.CommentSignalment.destroy({ where: { commentId: commentId}})
          return res.status(200).json({ message: "Comment signalments deleted"})
      } else {
          return res.status(401).json({ message: "You are not allowed to perform this action" })
      }
  } catch(error){
      return res.status(500).json({ error: error.message})
  }
}
