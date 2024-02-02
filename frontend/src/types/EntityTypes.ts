import SyncStatus from './SyncType';

interface EntityTypes {
  id: number;
  createdAt: string;
  updatedAt: string;

  syncStatus?: SyncStatus;
}

export default EntityTypes;
