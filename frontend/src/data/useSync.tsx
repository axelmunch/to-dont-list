'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import superFetch from '@/utils/superFetch';
import TaskType from '@/types/TaskType';
import TagType from '@/types/TagType';
import useSavedState from '@/utils/useSavedState';
import tagService from './TagService';
import taskService from './TaskService';

export interface SyncContextType {
  sync: () => void;
  syncing: boolean;
  syncError: string | null;
  reset: () => void;
  serverAddress: string;
  setServerAddress: (serverAddress: string) => void;

  tags: TagType[];
  tasks: TaskType[];
}

const defaultSyncContext: SyncContextType = {} as SyncContextType;
const SyncContext = createContext<SyncContextType>(defaultSyncContext);

export const SyncContextProvider = (
  props: React.PropsWithChildren
): JSX.Element => {
  const { children } = props;

  const [tags, setTags] = useState<TagType[]>([]);
  const [tasks, setTasks] = useState<TaskType[]>([]);

  useEffect(() => {
    tagService.getAll().then((data) => {
      setTags(data);
    });
    taskService.getAll().then((data) => {
      setTasks(data);
    });
  }, []);

  const [syncing, setSyncing] = useState<boolean>(false);
  const [syncError, setSyncError] = useState<string | null>(null);
  const [serverAddress, setServerAddress] = useSavedState<string>(
    'serverAddress',
    ''
  );

  const sync: SyncContextType['sync'] = () => {
    setSyncing(true);
    setSyncError(null);

    // Sync
    Promise.all([
      superFetch<TagType[]>(`${serverAddress}/tags`).then((data) => {
        setTags(data);
        return tagService.deleteAll().then(() => tagService.addMultiple(data));
      }),

      superFetch<TaskType[]>(`${serverAddress}/tasks`).then((data) => {
        setTasks(data);
        return taskService
          .deleteAll()
          .then(() => taskService.addMultiple(data));
      }),
    ])
      .finally(() => {
        setSyncing(false);
      })
      .catch((error) => {
        setSyncError(error.message);
      });
  };

  const reset: SyncContextType['reset'] = () => {
    setTasks([]);
    taskService.deleteAll();

    setTags([]);
    tagService.deleteAll();
  };

  return (
    <SyncContext.Provider
      value={{
        sync,
        syncing,
        syncError,
        reset,
        serverAddress,
        setServerAddress,

        tags,
        tasks,
      }}
    >
      {children}
    </SyncContext.Provider>
  );
};

export const useSync = (): SyncContextType => {
  const sync = useContext(SyncContext);
  if (sync === defaultSyncContext) {
    throw new Error(
      `'${useSync.name}' must be used within a '${SyncContextProvider.name}'`
    );
  }
  return sync;
};
