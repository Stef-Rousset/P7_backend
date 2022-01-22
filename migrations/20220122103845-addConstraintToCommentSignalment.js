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
        fields: ['commentId'],
        type: 'foreign key',
        name: 'fk_comment_signalments_comments',
        references: {
          table: 'comments',
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
     return queryInterface.removeConstraint('comments', 'fk_comment_signalments_comments');
  }
};
