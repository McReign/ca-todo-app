import { TodoListStorageServicePort } from '@/application/__ports__/storage/TodoListStorageServicePort';
import { useCallback } from 'react';
import { TodoList } from '@/domain/todoList/types/TodoList';

const TODO_LIST_KEY = 'todos';

export function useTodoListLocalStorageService(): TodoListStorageServicePort {
  const getTodoList = useCallback(() => {
    const todoList = localStorage.getItem(TODO_LIST_KEY);

    if (todoList) {
      try {
        return JSON.parse(todoList);
      } catch {
        return null;
      }
    }

    return null;
  }, []);

  const setTodoList = useCallback((todoList: TodoList) => {
    localStorage.setItem(TODO_LIST_KEY, JSON.stringify(todoList));
  }, []);

  const clearTodoList = useCallback(() => {
    localStorage.removeItem(TODO_LIST_KEY);
  }, []);

  return {
    getTodoList,
    setTodoList,
    clearTodoList,
  };
}
