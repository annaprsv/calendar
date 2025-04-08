"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("tasks", "text", {
      type: Sequelize.TEXT,
      allowNull: true, // Убираем NOT NULL
    });

    await queryInterface.changeColumn("tasks", "date", {
      type: Sequelize.STRING,
      allowNull: true, // Убираем NOT NULL
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("tasks", "text", {
      type: Sequelize.TEXT,
      allowNull: false, // Возвращаем NOT NULL
    });

    await queryInterface.changeColumn("tasks", "date", {
      type: Sequelize.STRING,
      allowNull: false, // Возвращаем NOT NULL
    });
  },
};
