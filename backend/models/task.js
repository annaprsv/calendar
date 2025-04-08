'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Task.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // Автоматическая генерация UUID
      primaryKey: true, // Указываем, что это первичный ключ
    },
    text: DataTypes.TEXT,
    date: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Task',
    tableName: 'tasks', // Указываем имя таблицы в базе данных
    timestamps: true
  });
  return Task;
};