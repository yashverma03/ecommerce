import { configureStore } from '@reduxjs/toolkit';
import { searchReducer } from './reducers/search';
import { userReducer } from './reducers/user';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    user: userReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
