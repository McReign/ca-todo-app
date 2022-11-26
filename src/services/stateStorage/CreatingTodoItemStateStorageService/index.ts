import { useCallback } from 'react';
import { atom, useRecoilValue, useSetRecoilState } from 'recoil';
import { CreatingTodoItemStorageServicePort } from '@/application/__ports__/storage/CreatingTodoItemStorageServicePort';
import { CreatingTodoItemState } from '@/services/stateStorage/CreatingTodoItemStateStorageService/types';
import { CreatingTodoItem } from '@/domain/creatingTodoItem/types/CreatingTodoItem';

const defaultState: CreatingTodoItemState = {
  title: '',
};

const store = atom<CreatingTodoItemState>({
  key: 'CreatingTodoItem',
  default: defaultState,
});

export const useCreatingTodoItemStateStorageService = (): CreatingTodoItemStorageServicePort => {
  const state = useRecoilValue(store);
  const setState = useSetRecoilState(store);

  const getCreatingTodoItem = useCallback(() => state, [state]);

  const setCreatingTodoItem = useCallback(
    (creatingTodoItem: CreatingTodoItem) => setState(creatingTodoItem),
    [setState]
  );

  const clearCreatingTodoItem = useCallback(() => setState(defaultState), [setState]);

  return {
    getCreatingTodoItem,
    setCreatingTodoItem,
    clearCreatingTodoItem,
  };
};
