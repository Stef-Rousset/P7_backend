'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CommentSignalment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Comment }) {
      // define association here
      this.belongsTo(User, { foreignKey: 'userId'})
      this.belongsTo(Comment, { foreignKey: 'commentId'} )
    }
  };
  CommentSignalment.init({

  }, {
    sequelize,
    tableName: 'comment_signalments',
    modelName: 'CommentSignalment',
  });
  return CommentSignalment;
};
