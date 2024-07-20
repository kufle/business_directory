import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface IState {
  user: any;
  errors: any;
}

const initialState: IState = {
  user: {},
  errors: [],
};

export const authSocial = createAsyncThunk(
  "authSlice/authSocial",
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/auth/loginSocial`,
        payload,
      );
      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue({ message: error.message });
    }
  },
);

const authSlice = createSlice({
  name: "authSlice",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(authSocial.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(authSocial.rejected, (state, action: any) => {
        console.log("reject", action);
        state.errors = action.payload || action.error.message;
      });
  },
});

export default authSlice;
