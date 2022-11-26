import { TodoItem } from '@/domain/todoItem/types/TodoItem';
import { TodoList } from '@/domain/todoList/types/TodoList';
import { toggleCompleted } from '@/domain/todoItem/helpers/toggleCompleted';

export function toggleItemCompleted(todoList: TodoList, todoItem: TodoItem): TodoList {
  const todoItemIndex = todoList.items.findIndex(({ id }) => todoItem.id === id);

  const newTodoItems = [
    ...todoList.items.slice(0, todoItemIndex),
    toggleCompleted(todoItem),
    ...todoList.items.slice(todoItemIndex + 1),
  ];

  return { ...todoList, items: newTodoItems };
}
