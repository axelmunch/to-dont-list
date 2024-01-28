import database from './database.js';
import { Tag, type TagType } from './Tag.js';
import { Task, type TaskType } from './Task.js';

interface EntityTypes {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

// Relations
Tag.belongsToMany(Task, { through: 'TaskTag', onDelete: 'CASCADE' });
Task.belongsToMany(Tag, { through: 'TaskTag', onDelete: 'CASCADE' });

export { database, Tag, Task };
export type { EntityTypes, TagType, TaskType };
