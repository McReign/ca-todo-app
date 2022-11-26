import { TodoItemTitle } from '@/domain/todoItem/types/TodoItemTitle';

export type TodoItem = {
  id: UniqStringId;
  title: TodoItemTitle;
  completed: boolean;
};
