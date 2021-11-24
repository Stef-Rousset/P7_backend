'use strict';
//import du Model from sequelize
const {
  Model
} = require('sequelize');
//exporte une fonction qui contient la class User + initialise User
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Post, Like, Comment }) {
      // define association here
      this.hasMany(Post, { foreignKey: 'userId', onDelete: 'CASCADE' })
      this.hasMany(Like, { foreignKey: 'userId', onDelete: 'CASCADE' })
      this.hasMany(Comment, { foreignKey: 'userId', onDelete: 'CASCADE' })
    }
  };
  User.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM,
      values: ['standard', 'admin'],
      allowNull: false,
      defaultValue: 'standard',
    },
    imageUrl: DataTypes.STRING
    }, {
    sequelize,
    tableName: 'users',
    modelName: 'User',
  });
  return User;
};
