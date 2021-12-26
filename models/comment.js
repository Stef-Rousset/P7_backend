'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Post, CommentSignalment}) {
      // define association here
      this.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' })
      this.belongsTo(Post, { foreignKey: 'postId' , onDelete: 'CASCADE' })
      this.hasMany(CommentSignalment, { foreignKey: 'commentId'})
    }
  };
  Comment.init({
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      },
    }
  }, {
    sequelize,
    tableName: 'comments',
    modelName: 'Comment',
  });
  return Comment;
};
