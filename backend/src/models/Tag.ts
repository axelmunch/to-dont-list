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

const maxNameSize = 50;

export function validateTag(task: TagType): boolean {
  // Name
  if (typeof task.name !== 'undefined') {
    if (typeof task.name !== 'string' || task.name.length > maxNameSize) {
      return false;
    }
  }

  // Priority
  if (typeof task.priority !== 'undefined') {
    if (
      typeof task.priority !== 'string' ||
      !Object.values(priority).includes(task.priority)
    ) {
      return false;
    }
  }

  return true;
}
