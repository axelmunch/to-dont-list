import EntityTypes from './EntityTypes';
import Priority from './Priority';

interface TaskType extends EntityTypes {
  done?: boolean;
  title: string;
  content?: string;
  deadline?: Date;
  priority: Priority;
}

export default TaskType;
