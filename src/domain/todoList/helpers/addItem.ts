import { TodoList } from '@/domain/todoList/types/TodoList';
import { TodoItem } from '@/domain/todoItem/types/TodoItem';

export function addItem(todoList: TodoList, todoItem: TodoItem): TodoList {
  const newTodoItems = [...todoList.items, todoItem];
  return { ...todoList, items: newTodoItems };
}
