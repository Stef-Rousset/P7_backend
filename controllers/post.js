const models = require('../models');
const getUserIdFromToken = require('../helpers/getUserIdFromToken');


//POSTS
exports.getAllPosts = async(req, res) => {
  try {
      const posts = await models.Post.findAll({
        include: [{
          model: models.User,
          attributes: ["firstName", "lastName", "imageUrl"]
        }],
        order: [['createdAt', 'DESC']]
      });
      return res.status(200).json(posts)
  } catch(error){
      return res.status(500).json({ error: error.message })
  }
}
exports.getOnePost = async(req, res) => {
  try {
      const post = await models.Post.findOne( {where: { id: req.params.id },
        include: [{
          model: models.User,
          attributes: ["firstName", "lastName", "imageUrl"]
        },
        { model: models.Like,
          attributes: ["status"],
        },
        { model: models.Comment,
          include: [{
                    model: models.User,
                    attributes: ["firstName", "lastName"]
                    }]
        }]
      });
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

exports.deletePost = async(req, res) => {
  try {
      const userId = await getUserIdFromToken(req.headers.authorization.split(' ')[1]) //recup du token ds les headers
      const user = await models.User.findOne({ where: { id: userId }})
      const post = await models.Post.findOne({ where: { id: req.params.id}})
      if (user.id === post.userId || user.role === 'admin'){
          post.destroy()
          return res.status(200).json( { message: `${post.title} deleted` })
      } else {
          return res.status(401).json({ message: "You are not allowed to perform this action"})
      }
  } catch(error){
      return res.status(500).json({ error: error.message })
  }
}

//LIKES
exports.likePost = async(req, res) => {
  try{
      const userId = await getUserIdFromToken(req.headers.authorization.split(' ')[1])
      const post = await models.Post.findOne({ where: { id: req.body.postId } })
      const like = await models.Like.findOne({ where: { postId: post.id, userId: userId }})
      const writerOfThePost = await models.User.findOne({ where: { id: post.userId}})
      // si l'instance de like n'existe pas et que le current user n'est pas celui qui a ??crit le post, on la cr??e
      if (!like && writerOfThePost.id !== userId){
          const newLike = await models.Like.create({
                                                    status: req.body.status,
                                                    postId: post.id,
                                                    userId: userId
                                                  })
          return res.status(201).json({ message: `${newLike.status} added to post: ${post.title} ` })
      // si le current user n'est pas celui qui a ??crit le post et que l'instance de like existe, on l'update
      } else if (like && writerOfThePost.id !== userId) {
          await like.update({
                            status: req.body.status
                            })
          return res.status(200).json({ message: `Like status modified on post: ${post.title} ` })
      // si le current user est celui qui a ??crit le post
      } else {
          return res.status(401).json({ message: 'You cannot like or dislike your own post'})
      }
  } catch (error){
        return res.status(500).json({ error: error.message})
  }
}

//COMMENTS
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
exports.getAllComments = async(req, res) => {
  try {
      const post = await models.Post.findOne({ where: { id: req.params.id}})
      const comments = await models.Comment.findAll( { where: { postId: post.id},
        include: [{
          model: models.User,
          attributes: ["firstName", "lastName"]
        }],
        order: [['createdAt', 'DESC']]
      });
      return res.status(200).json(comments)
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

