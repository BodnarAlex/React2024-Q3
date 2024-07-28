import { configureStore } from '@reduxjs/toolkit';
import paginationReducer from './paginationSlice';
import { peopleApi } from '../services/api.ts';

export const store = configureStore({
  reducer: {
    pagination: paginationReducer,
    [peopleApi.reducerPath]: peopleApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(peopleApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
