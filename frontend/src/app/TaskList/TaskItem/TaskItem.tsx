import styles from './TaskItem.module.css';
import TaskType from '@/types/TaskType';

export default function TaskItem(task: TaskType) {
  return (
    <div className={styles.task}>
      <div className={styles.taskCheckbox}>
        <input
          type='checkbox'
          className={styles.checkbox}
          checked={task.done}
          onChange={() => {}}
        />
      </div>
      <div className={styles.taskText}>
        <h2>{task.title}</h2>
        <p>{task.content}</p>
      </div>
    </div>
  );
}
