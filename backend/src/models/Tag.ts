import { DataTypes } from 'sequelize';
import database from './database.js';
import priority from './priority.js';

export const Tag = database.define('Tag', {
  name: { type: DataTypes.STRING, allowNull: false },
  priority: {
    type: DataTypes.ENUM,
    values: Object.values(priority),
    defaultValue: priority.NONE,
  },
});

export interface TagType {
  name: string;
  priority: priority;
}
