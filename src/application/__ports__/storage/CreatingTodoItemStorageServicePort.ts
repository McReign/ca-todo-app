import { CreatingTodoItem } from '@/domain/creatingTodoItem/types/CreatingTodoItem';

export type CreatingTodoItemStorageServicePort = {
  getCreatingTodoItem: () => CreatingTodoItem;
  setCreatingTodoItem: (creatingTodoItem: CreatingTodoItem) => void;
  clearCreatingTodoItem: () => void;
};
