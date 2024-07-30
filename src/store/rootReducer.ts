import { combineReducers } from '@reduxjs/toolkit';
import paginationReducer from './slices/paginationSlice';
import selectedItemsReducer from './slices/selectedItemsSlice';
import { peopleApi } from '../services/api';

const rootReducer = combineReducers({
  pagination: paginationReducer,
  selectedItems: selectedItemsReducer,
  [peopleApi.reducerPath]: peopleApi.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
