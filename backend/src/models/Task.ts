import { DataTypes } from 'sequelize';
import database from './database.js';
import Priority from './Priority.js';

export const Task = database.define('Task', {
  done: { type: DataTypes.BOOLEAN, defaultValue: false },
  title: { type: DataTypes.STRING, allowNull: false },
  content: { type: DataTypes.TEXT, allowNull: true },
  deadline: { type: DataTypes.DATE, allowNull: true },
  priority: {
    type: DataTypes.ENUM,
    values: Object.values(Priority),
    defaultValue: Priority.NONE,
  },
});

export interface TaskType {
  done?: boolean;
  title: string;
  content?: string;
  deadline?: Date;
  priority: Priority;
}

const maxTitleSize = 50;
const maxContentSize = 1000;

export function validateTask(task: TaskType): boolean {
  // Done
  if (typeof task.done !== 'undefined') {
    if (typeof task.done !== 'boolean') {
      return false;
    }
  }

  // Title
  if (typeof task.title !== 'undefined') {
    if (typeof task.title !== 'string' || task.title.length > maxTitleSize) {
      return false;
    }
  }

  // Content
  if (typeof task.content !== 'undefined') {
    if (
      typeof task.content !== 'string' ||
      task.content.length > maxContentSize
    ) {
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
