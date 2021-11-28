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
      this.belongsTo(User, { foreignKey: 'userId' })
      this.belongsTo(Post, { foreignKey: 'postId' })
      this.hasMany(CommentSignalment, { foreignKey: 'commentId', onDelete: 'CASCADE'})
    }
  };
  Comment.init({
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    }
  }, {
    sequelize,
    tableName: 'comments',
    modelName: 'Comment',
  });
  return Comment;
};
