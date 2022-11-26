import React, { ChangeEvent, FormEvent, useEffect } from 'react';
import styles from './styles.module.scss';
import { useCreatingTodoItemStateStorageService } from '@/services/stateStorage/CreatingTodoItemStateStorageService';
import { useTodoListStateStorageService } from '@/services/stateStorage/TodoListStateStorageService';
import { useTodoListLocalStorageService } from '@/services/localStorage/TodoListLocalStorageService';
import { loadTodoListUseCase } from '@/application/loadTodoList';
import { addTodoItemUseCase } from '@/application/addTodoItem';
import { updateCreatingTodoItemTitleUseCase } from '@/application/updateCreatingTodoItemTitle';
import { toggleTodoItemCompletedUseCase } from '@/application/toggleTodoItemCompleted';

export function HomePage() {
  const creatingTodoItemStateStorageService = useCreatingTodoItemStateStorageService();
  const todoListStateStorageService = useTodoListStateStorageService();
  const todoListLocalStorageService = useTodoListLocalStorageService();

  const todoItems = todoListStateStorageService.getTodoList()?.items || [];
  const creatingTodoItemTitle = creatingTodoItemStateStorageService.getCreatingTodoItem().title;

  const { execute: loadTodoList } = loadTodoListUseCase({
    todoListLocalStorageService,
    todoListStateStorageService,
  });
  const { execute: addTodoItem } = addTodoItemUseCase({
    creatingTodoItemStateStorageService,
    todoListLocalStorageService,
    todoListStateStorageService,
  });
  const { execute: updateCreatingTodoItemTitle } = updateCreatingTodoItemTitleUseCase({
    creatingTodoItemStateStorageService,
  });
  const { execute: toggleTodoItemCompleted } = toggleTodoItemCompletedUseCase({
    todoListLocalStorageService,
    todoListStateStorageService,
  });

  function handleAddTodoItem(event: FormEvent) {
    event.preventDefault();
    addTodoItem(creatingTodoItemTitle);
  }

  function handleUpdateCreatingTodoItemTitle(event: ChangeEvent<HTMLInputElement>) {
    updateCreatingTodoItemTitle(event.target.value);
  }

  useEffect(() => {
    loadTodoList();
  }, []);

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleAddTodoItem}>
        <input
          type="text"
          placeholder="Добавьте задачу"
          value={creatingTodoItemTitle}
          onChange={handleUpdateCreatingTodoItemTitle}
        />
      </form>
      {todoItems.length ? (
        todoItems.map((todoItem) => (
          <label key={todoItem.id}>
            <input type="checkbox" checked={todoItem.completed} onChange={() => toggleTodoItemCompleted(todoItem)} />
            <span>{todoItem.title}</span>
          </label>
        ))
      ) : (
        <h3>Список задач пуст</h3>
      )}
    </div>
  );
}
