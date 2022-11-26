import React, { useEffect } from 'react';
import { Input, Checkbox, Row, Col, Typography, List, Empty } from 'antd';
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

  const todoItems = [...(todoListStateStorageService.getTodoList()?.items || [])].reverse();
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

  useEffect(() => {
    loadTodoList();
  }, []);

  return (
    <Row justify="center">
      <Col xs={24} sm={20} md={16} lg={12} xl={8}>
        <Row gutter={[12, 12]}>
          <Col span={24}>
            <Input
              size="large"
              placeholder="Добавьте задачу..."
              value={creatingTodoItemTitle}
              onChange={(event) => updateCreatingTodoItemTitle(event.target.value)}
              onPressEnter={() => addTodoItem()}
            />
          </Col>
          <Col span={24}>
            <List
              bordered
              locale={{ emptyText: <Empty description="Список задач пуст" /> }}
              dataSource={todoItems}
              renderItem={(todoItem) => (
                <List.Item>
                  <Checkbox
                    key={todoItem.id}
                    checked={todoItem.completed}
                    onChange={() => toggleTodoItemCompleted(todoItem)}
                  >
                    <Typography.Text disabled={todoItem.completed} delete={todoItem.completed}>
                      {todoItem.title}
                    </Typography.Text>
                  </Checkbox>
                </List.Item>
              )}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
