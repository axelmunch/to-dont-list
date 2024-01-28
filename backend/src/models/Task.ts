import { DataTypes } from 'sequelize';
import database from './database.js';
import priority from './priority.js';

const Task = database.define('Task', {
  done: { type: DataTypes.BOOLEAN, defaultValue: false },
  title: DataTypes.STRING,
  content: { type: DataTypes.TEXT, allowNull: true },
  deadline: { type: DataTypes.DATE, allowNull: true },
  priority: {
    type: DataTypes.ENUM,
    values: Object.values(priority),
    defaultValue: priority.NONE,
  },
});

export default Task;
