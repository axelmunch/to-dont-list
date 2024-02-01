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
  const [serverAddress, setServerAddress] = useSavedState<string>(
    'serverAddress',
    ''
  );

  const sync: SyncContextType['sync'] = () => {
    setSyncing(true);

    // Sync
    superFetch<TagType[]>(`${serverAddress}/tags`).then((data) => {
      setTags(data);
    });

    superFetch<TaskType[]>(`${serverAddress}/tasks`).then((data) => {
      setTasks(data);
      taskService.deleteAll().then(() => taskService.addMultiple(data));
    });

    setSyncing(false);
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
