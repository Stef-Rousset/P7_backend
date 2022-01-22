'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     return Promise.all([
      queryInterface.addConstraint('comment_signalments', {
        fields: ['userId'],
        type: 'foreign key',
        name: 'fk_comment_signalments_users',
        references: {
          table: 'users',
          field: 'id'
        },
        onDelete: 'cascade',
      })
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     return queryInterface.removeConstraint('comment_signalments', 'fk_comment_signalments_users');
  }
};
