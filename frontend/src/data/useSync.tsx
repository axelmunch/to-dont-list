'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import superFetch from '@/utils/superFetch';
import TaskType from '@/types/TaskType';
import TagType from '@/types/TagType';
import useSavedState from '@/utils/useSavedState';
import tagService from './TagService';
import taskService from './TaskService';
import SyncType from '@/types/SyncType';
import EntityTypes from '@/types/EntityTypes';

export interface SyncContextType {
  sync: () => void;
  syncing: boolean;
  syncError: string | null;
  reset: () => void;
  serverAddress: string;
  setServerAddress: (serverAddress: string) => void;

  tags: TagType[];
  tasks: TaskType[];

  create_tag: (
    tag: Omit<TagType, 'id' | 'createdAt' | 'updatedAt' | 'syncStatus'>
  ) => void;
  update_tag: (tag: TagType) => void;
  delete_tag: (tag: TagType) => void;

  create_task: (
    task: Omit<TaskType, 'id' | 'createdAt' | 'updatedAt' | 'syncStatus'>
  ) => void;
  update_task: (task: TaskType) => void;
  delete_task: (task: TaskType) => void;
}

const defaultSyncContext: SyncContextType = {} as SyncContextType;
const SyncContext = createContext<SyncContextType>(defaultSyncContext);

export const SyncContextProvider = (
  props: React.PropsWithChildren
): JSX.Element => {
  const { children } = props;

  const [tags, setTags] = useState<TagType[]>([]);
  const [tagsWithDeleted, setTagsWithDeleted] = useState<TagType[]>([]);
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [tasksWithDeleted, setTasksWithDeleted] = useState<TaskType[]>([]);

  useEffect(() => {
    tagService.getAll().then((data) => {
      setTagsWithDeleted(data);
    });
    taskService.getAll().then((data) => {
      setTasksWithDeleted(data);
    });
  }, []);

  useEffect(() => {
    setTags(
      tagsWithDeleted
        .filter((element) => element.syncStatus !== SyncType.DELETED)
        .sort((a, b) =>
          new Date(a.createdAt).getTime() < new Date(b.createdAt).getTime()
            ? 1
            : -1
        )
    );
  }, [tagsWithDeleted]);

  useEffect(() => {
    setTasks(
      tasksWithDeleted
        .filter((element) => element.syncStatus !== SyncType.DELETED)
        .sort((a, b) =>
          new Date(a.createdAt).getTime() < new Date(b.createdAt).getTime()
            ? 1
            : -1
        )
    );
  }, [tasksWithDeleted]);

  const [syncing, setSyncing] = useState<boolean>(false);
  const [syncError, setSyncError] = useState<string | null>(null);
  const [serverAddress, setServerAddress] = useSavedState<string>(
    'serverAddress',
    ''
  );

  const get_id = (list: EntityTypes[]): number => {
    let maxId = 0;
    list.forEach((element) => {
      if (Math.abs(element.id) > maxId) {
        maxId = Math.abs(element.id);
      }
    });

    return -(maxId + 1);
  };

  const create_tag: SyncContextType['create_tag'] = (tag) => {
    const date = new Date().toISOString();

    const newTag: TagType = {
      ...tag,
      id: get_id(tagsWithDeleted),
      createdAt: date,
      updatedAt: date,
      syncStatus: SyncType.CREATED,
    };

    tagService.add(newTag);
    setTagsWithDeleted((prev) => [newTag, ...prev]);
  };

  const update_tag: SyncContextType['update_tag'] = (tag) => {
    const date = new Date().toISOString();

    const updatedTag: TagType = {
      ...tag,
      updatedAt: date,
      syncStatus:
        tag.syncStatus === SyncType.CREATED
          ? SyncType.CREATED
          : SyncType.UPDATED,
    };

    tagService.update(updatedTag);
    setTagsWithDeleted((prev) => [
      ...prev.filter((t) => t.id !== tag.id),
      updatedTag,
    ]);
  };

  const delete_tag: SyncContextType['delete_tag'] = (tag) => {
    const date = new Date().toISOString();

    const deletedTag: TagType = {
      ...tag,
      updatedAt: date,
      syncStatus: SyncType.DELETED,
    };

    tagService.update(deletedTag);
    setTagsWithDeleted((prev) => [
      ...prev.filter((t) => t.id !== tag.id),
      deletedTag,
    ]);
  };

  const create_task: SyncContextType['create_task'] = (task) => {
    const date = new Date().toISOString();

    const newTask: TaskType = {
      ...task,
      id: get_id(tasksWithDeleted),
      createdAt: date,
      updatedAt: date,
      syncStatus: SyncType.CREATED,
    };

    taskService.add(newTask);
    setTasksWithDeleted((prev) => [newTask, ...prev]);
  };

  const update_task: SyncContextType['update_task'] = (task) => {
    const date = new Date().toISOString();

    const updatedTask: TaskType = {
      ...task,
      updatedAt: date,
      syncStatus:
        task.syncStatus === SyncType.CREATED
          ? SyncType.CREATED
          : SyncType.UPDATED,
    };

    taskService.update(updatedTask);
    setTasksWithDeleted((prev) => [
      ...prev.filter((t) => t.id !== task.id),
      updatedTask,
    ]);
  };

  const delete_task: SyncContextType['delete_task'] = (task) => {
    const date = new Date().toISOString();

    const deletedTask: TaskType = {
      ...task,
      updatedAt: date,
      syncStatus: SyncType.DELETED,
    };

    taskService.update(deletedTask);
    setTasksWithDeleted((prev) => [
      ...prev.filter((t) => t.id !== task.id),
      deletedTask,
    ]);
  };

  const sync: SyncContextType['sync'] = () => {
    setSyncing(true);
    setSyncError(null);

    // Sync
    Promise.all([
      superFetch<TagType[]>(`${serverAddress}/tags`).then((data) => {
        setTagsWithDeleted(data);
        return tagService.deleteAll().then(() => tagService.addMultiple(data));
      }),

      superFetch<TaskType[]>(`${serverAddress}/tasks`).then((data) => {
        setTasksWithDeleted(data);
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
    setTagsWithDeleted([]);
    tagService.deleteAll();

    setTasksWithDeleted([]);
    taskService.deleteAll();
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

        create_tag,
        update_tag,
        delete_tag,

        create_task,
        update_task,
        delete_task,
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
