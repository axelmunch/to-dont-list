'use client';

import styles from './page.module.css';
import TaskList from './TaskList/TaskList';

export default function App() {
  return (
    <>
      <h1 className={styles.title}>To-don&apos;t list</h1>
      <TaskList />
    </>
  );
}
