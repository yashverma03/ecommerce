import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { getFromLocalStorage } from '../../localStorageApi';

interface User {
  name?: string;
  email?: string;
  token?: string;
}

const savedUser = getFromLocalStorage('user');

const initialState: User = {
  name: savedUser?.name,
  email: savedUser?.email,
  token: savedUser?.token
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      const { name, email, token } = action.payload;
      state.name = name;
      state.email = email;
      state.token = token;
    },
    removeUser: (state) => {
      state.name = undefined;
      state.email = undefined;
      state.token = undefined;
    }
  }
});

export const { setUser, removeUser } = userSlice.actions;

export const userReducer = userSlice.reducer;
