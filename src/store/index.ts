import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import { peopleApi } from '../services/api';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(peopleApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export default store;
