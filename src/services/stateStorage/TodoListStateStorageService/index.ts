import { useCallback } from 'react';
import { atom, useRecoilValue, useSetRecoilState } from 'recoil';
import { TodoListStorageServicePort } from '@/application/__ports__/storage/TodoListStorageServicePort';
import { TodoListState } from '@/services/stateStorage/TodoListStateStorageService/types';
import { TodoList } from '@/domain/todoList/types/TodoList';

const defaultState: TodoListState = null;

const store = atom<TodoListState>({
  key: 'TodoList',
  default: defaultState,
});

export const useTodoListStateStorageService = (): TodoListStorageServicePort => {
  const state = useRecoilValue(store);
  const setState = useSetRecoilState(store);

  const getTodoList = useCallback(() => state, [state]);

  const setTodoList = useCallback((todoList: TodoList) => setState(todoList), [setState]);

  const clearTodoList = useCallback(() => setState(defaultState), [setState]);

  return {
    getTodoList,
    setTodoList,
    clearTodoList,
  };
};
