import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    value: ''
  },
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    }
  }
});

export const { setSearch } = searchSlice.actions;

export const searchReducer = searchSlice.reducer;
