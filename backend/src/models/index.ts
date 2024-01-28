import database from './database.js';
import Tag from './Tag.js';
import Task from './Task.js';

// Relations
Tag.belongsToMany(Task, { through: 'TaskTag', onDelete: 'CASCADE' });
Task.belongsToMany(Tag, { through: 'TaskTag', onDelete: 'CASCADE' });

export { database, Tag, Task };
