import { UseCasePort } from '@/application/__ports__/application/UseCasePort';
import { TodoListStorageServicePort } from '@/application/__ports__/storage/TodoListStorageServicePort';
import { TodoItem } from '@/domain/todoItem/types/TodoItem';
import { toggleItemCompleted } from '@/domain/todoList/helpers/toggleItemCompleted';

export type ToggleTodoItemCompletedServices = {
  todoListStateStorageService: TodoListStorageServicePort;
  todoListLocalStorageService: TodoListStorageServicePort;
};
export type ToggleTodoItemCompletedExecutor = (todoItem: TodoItem) => Promise<void>;

export const toggleTodoItemCompletedUseCase: UseCasePort<
  ToggleTodoItemCompletedServices,
  ToggleTodoItemCompletedExecutor
> = ({ todoListStateStorageService, todoListLocalStorageService }) => {
  const execute: ToggleTodoItemCompletedExecutor = async (todoItem) => {
    const todoList = todoListStateStorageService.getTodoList();

    if (todoList) {
      const updatedTodoList = toggleItemCompleted(todoList, todoItem);

      todoListStateStorageService.setTodoList(updatedTodoList);
      todoListLocalStorageService.setTodoList(updatedTodoList);
    }
  };

  return { execute };
};
