import { TodoList } from '@/domain/todoList/types/TodoList';

export function create(): TodoList {
  return { items: [] };
}
