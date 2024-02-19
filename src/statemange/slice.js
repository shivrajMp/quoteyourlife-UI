// src/features/api/apiSlice.js

import { createSlice } from '@reduxjs/toolkit';

const apiSlice = createSlice({
  name: 'api',
  initialState: {
    loading: false,
    data: null,
    error: null,
  },
  reducers: {
    startLoading: (state) => {
      state.loading = true;
    },
    apiSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    },
    apiError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { startLoading, apiSuccess, apiError } = apiSlice.actions;

export default apiSlice.reducer;
