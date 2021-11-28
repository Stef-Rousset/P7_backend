'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Like, Comment, PostSignalment }) {
      // define association here
      this.belongsTo(User, { foreignKey: 'userId' })
      this.hasMany(Like, { foreignKey: 'postId', onDelete: 'CASCADE' })
      this.hasMany(Comment, { foreignKey: 'postId', onDelete: 'CASCADE' })
      this.hasMany(PostSignalment, { foreignKey: 'postId', onDelete: 'CASCADE'})
    }
  };
  Post.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    }
    }, {
    sequelize,
    tableName: 'posts',
    modelName: 'Post',
  });
  return Post;
};
