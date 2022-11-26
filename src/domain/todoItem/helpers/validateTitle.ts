import { TodoItemTitle } from '@/domain/todoItem/types/TodoItemTitle';

export function validateTitle(title: TodoItemTitle): boolean {
  return title?.length > 0;
}
