import { storageGetData, storageRemoveMultiData } from "@/utils";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface IState {
  user: any;
  errors: any;
  loading: boolean;
}

const initialState: IState = {
  user: {},
  loading: false,
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

export const logoutUser = createAsyncThunk(
  "authSlice/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const token = await storageGetData("token");
      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/auth/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      await storageRemoveMultiData(["user"]);
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
      })
      .addCase(logoutUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = {};
      })
      .addCase(logoutUser.rejected, (state, action: any) => {
        state.loading = false;
        state.errors = action.payload || action.error.message;
      });
  },
});

export default authSlice;
