import styles from './TaskList.module.css';
import TaskItem from './TaskItem/TaskItem';
import { useSync } from '@/data/useSync';

export default function TaskList() {
  const { tasks } = useSync();

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
