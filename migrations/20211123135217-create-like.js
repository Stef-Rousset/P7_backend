'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('likes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      status: {
        type: DataTypes.ENUM,
        values: ['like', 'dislike', 'none'],
        allowNull: false,
        defaultValue: 'none',
      },
      userId:{
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      postId:{
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable('likes');
  }
};
