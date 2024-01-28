import { DataTypes } from 'sequelize';
import database from './database.js';
import priority from './priority.js';

export const Task = database.define('Task', {
  done: { type: DataTypes.BOOLEAN, defaultValue: false },
  title: { type: DataTypes.STRING, allowNull: false },
  content: { type: DataTypes.TEXT, allowNull: true },
  deadline: { type: DataTypes.DATE, allowNull: true },
  priority: {
    type: DataTypes.ENUM,
    values: Object.values(priority),
    defaultValue: priority.NONE,
  },
});

export interface TaskType {
  done?: boolean;
  title: string;
  content?: string;
  deadline?: Date;
  priority: priority;
}
