import EntityTypes from './EntityTypes';
import Priority from './Priority';

interface TagType extends EntityTypes {
  name: string;
  priority: Priority;
}

export default TagType;
