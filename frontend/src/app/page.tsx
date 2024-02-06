'use client';

import styles from './page.module.css';
import LoadingIcon from './LoadingIcon/LoadingIcon';
import TaskList from './TaskList/TaskList';
import { useSync } from '@/data/useSync';

export default function App() {
  const { reset, sync, syncing, syncError } = useSync();

  return (
    <>
      <div>
        <button onClick={reset}>Reset</button>
        <button onClick={sync}>Sync</button>
        <LoadingIcon size='2.5rem' visible={syncing} />
        {syncError && <p>{syncError}</p>}
      </div>

      <h1 className={styles.title}>To-don&apos;t list</h1>
      <TaskList />
    </>
  );
}
