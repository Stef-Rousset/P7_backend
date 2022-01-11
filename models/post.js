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
      this.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' })
      this.hasMany(Like, { foreignKey: 'postId' })
      this.hasMany(Comment, { foreignKey: 'postId' })
      this.hasMany(PostSignalment, { foreignKey: 'postId'})
    }
  };
  Post.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      },
    },
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
    tableName: 'posts',
    modelName: 'Post',
  });
  return Post;
};
