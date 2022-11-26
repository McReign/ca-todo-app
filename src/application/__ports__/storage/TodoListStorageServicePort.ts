import { TodoList } from '@/domain/todoList/types/TodoList';

export type TodoListStorageServicePort = {
  getTodoList: () => TodoList | null;
  setTodoList: (todoList: TodoList) => void;
  clearTodoList: () => void;
};
