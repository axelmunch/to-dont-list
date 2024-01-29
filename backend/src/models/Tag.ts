import { DataTypes } from 'sequelize';
import database from './database.js';
import Priority from './Priority.js';

export const Tag = database.define('Tag', {
  name: { type: DataTypes.STRING, allowNull: false },
  priority: {
    type: DataTypes.ENUM,
    values: Object.values(Priority),
    defaultValue: Priority.NONE,
  },
});

export interface TagType {
  name: string;
  priority: Priority;
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
      !Object.values(Priority).includes(task.priority)
    ) {
      return false;
    }
  }

  return true;
}
