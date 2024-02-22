// src/features/api/apiSlice.js

import { createSlice } from "@reduxjs/toolkit";

const loginReducer = createSlice({
  name: "login",
  initialState: {
    loginloginloading: false,
    logindata: null,
    loginerror: null,
  },
  reducers: {
    startLoading: (state) => {
      state.loginloading = true;
    },
    apiSuccess: (state, action) => {
      state.loginloading = false;
      state.logindata = action.payload;
      state.loginerror = null;
    },
    apiError: (state, action) => {
      state.loginloading = false;
      state.loginerror = action.payload;
    },
    stopLoading: (state) => {
      state.loginloading = false;
    },
    resetData: (state) => {
      state.loginloading = false;
      state.logindata = null;
      state.loginerror = null;
    },
  },
});

export const { stopLoading, apiSuccess, apiError, startLoading ,resetData} =
  loginReducer.actions;

export default loginReducer.reducer;
