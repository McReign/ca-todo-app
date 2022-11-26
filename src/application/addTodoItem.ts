import { UseCasePort } from '@/application/__ports__/application/UseCasePort';
import { CreatingTodoItemStorageServicePort } from '@/application/__ports__/storage/CreatingTodoItemStorageServicePort';
import { TodoListStorageServicePort } from '@/application/__ports__/storage/TodoListStorageServicePort';
import { updateTitle } from '@/domain/creatingTodoItem/helpers/updateTitle';
import { create as createTodoItem } from '@/domain/todoItem/helpers/create';
import { addItem } from '@/domain/todoList/helpers/addItem';

export type AddTodoItemServices = {
  creatingTodoItemStateStorageService: CreatingTodoItemStorageServicePort;
  todoListStateStorageService: TodoListStorageServicePort;
  todoListLocalStorageService: TodoListStorageServicePort;
};
export type AddTodoItemExecutor = () => Promise<void>;

export const addTodoItemUseCase: UseCasePort<AddTodoItemServices, AddTodoItemExecutor> = ({
  creatingTodoItemStateStorageService,
  todoListStateStorageService,
  todoListLocalStorageService,
}) => {
  const execute: AddTodoItemExecutor = async () => {
    const todoList = todoListStateStorageService.getTodoList();
    const creatingTodoItem = creatingTodoItemStateStorageService.getCreatingTodoItem();

    const createdTodoItem = createTodoItem(creatingTodoItem.title);

    if (todoList && createdTodoItem) {
      const updatedTodoList = addItem(todoList, createdTodoItem);
      todoListStateStorageService.setTodoList(updatedTodoList);
      todoListLocalStorageService.setTodoList(updatedTodoList);

      const updatedCreatingTodoItem = updateTitle(creatingTodoItem, '');
      creatingTodoItemStateStorageService.setCreatingTodoItem(updatedCreatingTodoItem);
    }
  };

  return { execute };
};
