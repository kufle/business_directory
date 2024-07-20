import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  globalLoading: false,
};

const globalSlice = createSlice({
  name: "globalSlice",
  initialState: initialState,
  reducers: {
    showLoading: (state, action) => {
      state.globalLoading = action.payload;
    },
  },
});

export default globalSlice;
