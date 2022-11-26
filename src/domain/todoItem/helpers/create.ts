import { v4 } from 'uuid';
import { TodoItem } from '@/domain/todoItem/types/TodoItem';
import { TodoItemTitle } from '@/domain/todoItem/types/TodoItemTitle';
import { validateTitle } from '@/domain/todoItem/helpers/validateTitle';

export function create(title: TodoItemTitle): TodoItem | null {
  if (!validateTitle(title)) {
    return null;
  }

  return { id: v4(), title, completed: false };
}
