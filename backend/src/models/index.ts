import database from './database.js';
import { Tag, validateTag, type TagType } from './Tag.js';
import { Task, validateTask, type TaskType } from './Task.js';

interface EntityTypes {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

// Relations
Tag.belongsToMany(Task, { through: 'TaskTag', onDelete: 'CASCADE' });
Task.belongsToMany(Tag, { through: 'TaskTag', onDelete: 'CASCADE' });

export { database, Tag, validateTag, Task, validateTask };
export type { EntityTypes, TagType, TaskType };
