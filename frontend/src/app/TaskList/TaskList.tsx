import { useState } from 'react';
import styles from './TaskList.module.css';
import TaskType from '@/types/TaskType';
import TaskItem from './TaskItem/TaskItem';

export default function TaskList() {
  const [tasks, _setTasks] = useState<TaskType[]>([]);

  return (
    <>
      <ul className={styles.taskList}>
        {tasks.map((task) => (
          <li key={task.id} className={styles.task}>
            <TaskItem {...task} />
          </li>
        ))}
      </ul>
    </>
  );
}
