// src/features/api/apiSlice.js

import { createSlice } from "@reduxjs/toolkit";

const postquoteReducer = createSlice({
  name: "postquote",
  initialState: {
    postquoteloading: false,
    postquotedata: null,
    postquoteerror: null,
  },
  reducers: {
    startLoading: (state) => {
      state.postquoteloading = true;
    },
    apiSuccess: (state, action) => {
      state.postquoteloading = false;
      state.postquotedata = action.payload;
      state.postquoteerror = null;
    },
    apiError: (state, action) => {
      state.postquoteloading = false;
      state.postquoteerror = action.payload;
    },
    stopLoading: (state) => {
      state.postquoteloading = false;
    },
    resetData: (state) => {
      state.postquoteloading = false;
      state.postquotedata = null;
      state.postquoteerror = null;
    },
  },
});

export const { stopLoading, apiSuccess, apiError, startLoading ,resetData } =
  postquoteReducer.actions;

export default postquoteReducer.reducer;
