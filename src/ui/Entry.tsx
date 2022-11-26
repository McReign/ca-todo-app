import React from 'react';
import { StateStorageServiceRoot } from '@/services/stateStorage/StateStorageServiceRoot';
import { HomePage } from '@/ui/HomePage';

export function Entry() {
  return (
    <StateStorageServiceRoot>
      <HomePage />
    </StateStorageServiceRoot>
  );
}
