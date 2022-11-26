import { CreatingTodoItem } from '@/domain/creatingTodoItem/types/CreatingTodoItem';
import { TodoItemTitle } from '@/domain/todoItem/types/TodoItemTitle';

export function updateTitle(creatingTodoItem: CreatingTodoItem, title: TodoItemTitle): CreatingTodoItem {
  return { ...creatingTodoItem, title };
}
