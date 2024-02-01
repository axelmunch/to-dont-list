import LocalDatabaseService from './LocalDatabaseService';
import TagType from '@/types/TagType';

class TagService extends LocalDatabaseService<TagType> {
  constructor() {
    super('tags');
  }
}

const tagService = new TagService();

export default tagService;
