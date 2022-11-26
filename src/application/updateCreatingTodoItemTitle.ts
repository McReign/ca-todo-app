import { UseCasePort } from '@/application/__ports__/application/UseCasePort';
import { CreatingTodoItemStorageServicePort } from '@/application/__ports__/storage/CreatingTodoItemStorageServicePort';
import { TodoItemTitle } from '@/domain/todoItem/types/TodoItemTitle';
import { updateTitle } from '@/domain/creatingTodoItem/helpers/updateTitle';

export type UpdateCreatingTodoItemTitleServices = {
  creatingTodoItemStateStorageService: CreatingTodoItemStorageServicePort;
};
export type UpdateCreatingTodoItemTitleExecutor = (title: TodoItemTitle) => Promise<void>;

export const updateCreatingTodoItemTitleUseCase: UseCasePort<
  UpdateCreatingTodoItemTitleServices,
  UpdateCreatingTodoItemTitleExecutor
> = ({ creatingTodoItemStateStorageService }) => {
  const execute: UpdateCreatingTodoItemTitleExecutor = async (title) => {
    const creatingTodoItem = creatingTodoItemStateStorageService.getCreatingTodoItem();

    const updatedCreatingTodoItem = updateTitle(creatingTodoItem, title);

    creatingTodoItemStateStorageService.setCreatingTodoItem(updatedCreatingTodoItem);
  };

  return { execute };
};
