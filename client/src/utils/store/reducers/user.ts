import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { getFromLocalStorage } from '../../localStorageApi';

interface User {
  userId?: number;
  name?: string;
  email?: string;
  token?: string;
}

const savedUser = getFromLocalStorage('user');

const initialUser: User = {
  userId: savedUser?.userId,
  name: savedUser?.name,
  email: savedUser?.email,
  token: savedUser?.token
};

const initialState: User | null = savedUser !== null ? initialUser : null;

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (_, action: PayloadAction<User>) => {
      return action.payload;
    },
    removeUser: () => {
      return null;
    }
  }
});

export const { setUser, removeUser } = userSlice.actions;

export const userReducer = userSlice.reducer;
