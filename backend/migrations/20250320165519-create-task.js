'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      CREATE TABLE "tasks" (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        text TEXT NOT NULL,
        date VARCHAR(255) NOT NULL
      );
    `);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      DROP TABLE "tasks";
    `);
  },
};