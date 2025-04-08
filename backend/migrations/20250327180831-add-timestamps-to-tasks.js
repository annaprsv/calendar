'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('tasks', 'createdAt', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    });
    await queryInterface.addColumn('tasks', 'updatedAt', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('tasks', 'createdAt');
    await queryInterface.removeColumn('tasks', 'updatedAt');
  }
};