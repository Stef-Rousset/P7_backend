'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PostSignalment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Post }) {
      // define association here
      this.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' })
      this.belongsTo(Post, { foreignKey: 'postId', onDelete: 'CASCADE'})
    }
  };
  PostSignalment.init({
  }, {
    sequelize,
    tableName: 'post_signalments',
    modelName: 'PostSignalment',
  });
  return PostSignalment;
};
