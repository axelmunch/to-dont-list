import styles from './TaskItem.module.css';
import TaskType from '@/types/TaskType';
import { useSync } from '@/data/useSync';

export default function TaskItem(task: TaskType) {
  const { update_task } = useSync();

  return (
    <div className={styles.task}>
      <div className={styles.taskCheckbox}>
        <input
          type='checkbox'
          className={styles.checkbox}
          checked={task.done}
          onChange={() => {
            update_task({ ...task, done: !task.done });
          }}
        />
      </div>
      <div className={styles.taskText}>
        <h2>{task.title}</h2>
        <p>{task.content}</p>
      </div>
    </div>
  );
}
