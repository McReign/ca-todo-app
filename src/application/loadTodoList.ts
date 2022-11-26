import { UseCasePort } from '@/application/__ports__/application/UseCasePort';
import { TodoListStorageServicePort } from '@/application/__ports__/storage/TodoListStorageServicePort';
import { create as createTodoList } from '@/domain/todoList/helpers/create';

export type LoadTodoListUseCaseServices = {
  todoListStateStorageService: TodoListStorageServicePort;
  todoListLocalStorageService: TodoListStorageServicePort;
};
export type LoadTodoListUseCaseExecutor = () => Promise<void>;

export const loadTodoListUseCase: UseCasePort<LoadTodoListUseCaseServices, LoadTodoListUseCaseExecutor> = ({
  todoListStateStorageService,
  todoListLocalStorageService,
}) => {
  const execute: LoadTodoListUseCaseExecutor = async () => {
    const localTodoList = todoListLocalStorageService.getTodoList();

    if (localTodoList) {
      todoListStateStorageService.setTodoList(localTodoList);
    } else {
      todoListStateStorageService.setTodoList(createTodoList());
    }
  };

  return { execute };
};
