'use client';

import styles from './page.module.css';
import TaskList from './TaskList/TaskList';
import { useSync } from '@/data/useSync';

export default function App() {
  const { reset, sync } = useSync();

  return (
    <>
      <button onClick={reset}>Reset</button>
      <button onClick={sync}>Sync</button>
      <h1 className={styles.title}>To-don&apos;t list</h1>
      <TaskList />
    </>
  );
}
