import styles from './TaskList.module.css';
import TaskItem from './TaskItem/TaskItem';
import Priority from '@/types/Priority';
import { useSync } from '@/data/useSync';

export default function TaskList() {
  const { tasks, create_task, delete_task } = useSync();

  return (
    <>
      <button
        onClick={() => {
          create_task({
            title: 'New task',
            content: 'New task content',
            done: false,
            priority: Priority.NONE,
          });
        }}
      >
        Create
      </button>
      <ul className={styles.taskList}>
        {tasks.map((task) => (
          <li key={task.id} className={styles.task}>
            <TaskItem {...task} />
            <button onClick={() => delete_task(task)}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  );
}
