
import { createSlice } from "@reduxjs/toolkit";

const deleteReducer = createSlice({
  name: "delete",
  initialState: {
    deleteloading: false,
    deletedata: null,
    deleteerror: null,
  },
  reducers: {
    deleteStartLoading: (state) => {
      state.deleteloading = true;
    },
    deleteApiSuccess: (state, action) => {
      state.deleteloading = false;
      state.deletedata = action.payload;
      state.deleteerror = null;
    },
    deleteApiError: (state, action) => {
      state.deleteloading = false;
      state.deleteerror = action.payload;
    },
    deleteStopLoading: (state) => {
      state.deleteloading = false;
    },
    deleteResetData: (state) => {
      state.deleteloading = false;
      state.deletedata = null;
      state.deleteerror = null;
    },
  },
});

export const { deleteStopLoading, deleteApiSuccess, deleteApiError, deleteStartLoading ,deleteResetData} =
  deleteReducer.actions;

export default deleteReducer.reducer;
