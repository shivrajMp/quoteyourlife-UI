// src/features/api/apiSlice.js

import { createSlice } from "@reduxjs/toolkit";

const registerReducer = createSlice({
  name: "register",
  initialState: {
    registerregisterloading: false,
    registerdata: null,
    registererror: null,
  },
  reducers: {
    startLoading: (state) => {
      state.registerloading = true;
    },
    apiSuccess: (state, action) => {
      state.registerloading = false;
      state.registerdata = action.payload;
      state.registererror = null;
    },
    apiError: (state, action) => {
      state.registerloading = false;
      state.registererror = action.payload;
    },
    stopLoading: (state) => {
      state.registerloading = false;
    },
    resetData: (state) => {
      state.registerloading = false;
      state.registerdata = null;
      state.registererror = null;
    },
  },
});

export const { stopLoading, apiSuccess, apiError, startLoading ,resetData} =
  registerReducer.actions;

export default registerReducer.reducer;
