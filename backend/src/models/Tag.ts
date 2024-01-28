import { DataTypes } from 'sequelize';
import database from './database.js';
import priority from './priority.js';

const Tag = database.define('Tag', {
  name: DataTypes.STRING,
  priority: {
    type: DataTypes.ENUM,
    values: Object.values(priority),
    defaultValue: priority.NONE,
  },
});

export default Tag;
