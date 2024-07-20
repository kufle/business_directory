import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

type Istate = {
  categories: any[];
  businessCategory: any[];
  loading: boolean;
  errors: any[];
};

const initialState: Istate = {
  categories: [],
  businessCategory: [],
  loading: false,
  errors: [],
};

export const getCategory = createAsyncThunk(
  "categorySlice/getCategory",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.EXPO_PUBLIC_API_URL}/categories`,
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

export const getBusinessByCategory = createAsyncThunk(
  "homeSlice/getBusinessByCategory",
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.EXPO_PUBLIC_API_URL}/categories/${payload}`,
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

const categorySlice = createSlice({
  name: "categorySlice",
  initialState: initialState,
  reducers: {
    resetSelectedCategory: (state) => {
      state.businessCategory = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategory.fulfilled, (state, action) => {
        state.categories = action.payload.data;
      })
      .addCase(getCategory.rejected, (state, action: any) => {
        console.log("reject", action);
        state.errors = action.payload || action.error.message;
      })
      .addCase(getBusinessByCategory.pending, (state) => {
        state.loading = true;
        state.businessCategory = [];
      })
      .addCase(getBusinessByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.businessCategory = action.payload.data;
      })
      .addCase(getBusinessByCategory.rejected, (state, action: any) => {
        console.log("reject", action);
        state.loading = false;
        state.errors = action.payload || action.error.message;
      });
  },
});

export const { resetSelectedCategory } = categorySlice.actions;

export default categorySlice;
