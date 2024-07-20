import { storageGetData } from "@/utils";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

type Istate = {
  business: any[];
  popular_business: any[];
  business_detail: {} | null;
  loading: boolean;
  errors: any[];
  errorField: any;
};

const initialState: Istate = {
  business: [],
  popular_business: [],
  business_detail: null,
  loading: true,
  errors: [],
  errorField: null,
};

export const getPopularBusiness = createAsyncThunk(
  "businessSlice/getPopularBusiness",
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

export const getBusinessById = createAsyncThunk(
  "businessSlice/getBusinessByCategory",
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.EXPO_PUBLIC_API_URL}/business/${payload}`,
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

export const postRating = createAsyncThunk(
  "businessSlice/postRating",
  async ({ id, payload }: any, { rejectWithValue, dispatch }) => {
    try {
      const token = await storageGetData("token");
      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/business/${id}/review`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      //dispatch(getBusinessById(id));
      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue({ message: error.message });
    }
  },
);

const businessSlice = createSlice({
  name: "businessSlice",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPopularBusiness.fulfilled, (state, action) => {
        state.popular_business = action.payload.data;
      })
      .addCase(getPopularBusiness.rejected, (state, action: any) => {
        console.log("reject", action);
        state.errors = action.payload || action.error.message;
      })
      .addCase(getBusinessById.pending, (state) => {
        state.business_detail = null;
        state.loading = true;
      })
      .addCase(getBusinessById.fulfilled, (state, action) => {
        state.business_detail = action.payload.data;
        state.loading = false;
        state.errorField = null;
      })
      .addCase(getBusinessById.rejected, (state, action: any) => {
        console.log("reject", action);
        state.loading = false;
        state.errors = action.payload || action.error.message;
      })
      .addCase(postRating.pending, (state) => {
        state.errorField = null;
        state.loading = true;
      })
      .addCase(postRating.fulfilled, (state, action) => {
        state.loading = false;
        state.business_detail = {
          ...state.business_detail,
          ratings: action.payload.data,
        };
      })
      .addCase(postRating.rejected, (state, action: any) => {
        console.log("reject", action);
        state.loading = false;
        state.errorField = action.payload || action.error.message;
      });
  },
});

export default businessSlice;
