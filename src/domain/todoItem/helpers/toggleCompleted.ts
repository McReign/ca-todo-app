import { TodoItem } from '@/domain/todoItem/types/TodoItem';

export function toggleCompleted(todoItem: TodoItem): TodoItem {
  return { ...todoItem, completed: !todoItem.completed };
}
