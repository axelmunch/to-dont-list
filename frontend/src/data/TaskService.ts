import LocalDatabaseService from './LocalDatabaseService';
import TaskType from '@/types/TaskType';

class TaskService extends LocalDatabaseService<TaskType> {
  constructor() {
    super('tasks');
  }
}

const taskService = new TaskService();

export default taskService;
