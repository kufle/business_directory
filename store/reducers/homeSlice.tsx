import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

type Istate = {
  sliders: any[];
  categories: any[];
  business: any[];
  errors: any[];
};

const initialState: Istate = {
  sliders: [],
  categories: [],
  business: [],
  errors: [],
};

export const getSlider = createAsyncThunk(
  "homeSlice/getSlider",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.EXPO_PUBLIC_API_URL}/sliders`,
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

export const getCategory = createAsyncThunk(
  "homeSlice/getCategory",
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

export const getPopularBusiness = createAsyncThunk(
  "homeSlice/getPopularBusiness",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.EXPO_PUBLIC_API_URL}/business?filter=popular`,
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

const homeSlice = createSlice({
  name: "homeSlice",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSlider.fulfilled, (state, action) => {
        state.sliders = action.payload.data;
      })
      .addCase(getSlider.rejected, (state, action: any) => {
        console.log("reject", action);
        state.errors = action.payload || action.error.message;
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        state.categories = action.payload.data;
      })
      .addCase(getCategory.rejected, (state, action: any) => {
        console.log("reject", action);
        state.errors = action.payload || action.error.message;
      })
      .addCase(getPopularBusiness.fulfilled, (state, action) => {
        state.business = action.payload.data;
      })
      .addCase(getPopularBusiness.rejected, (state, action: any) => {
        console.log("reject", action);
        state.errors = action.payload || action.error.message;
      });
  },
});

export default homeSlice;
