import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/authSlice";
import homeSlice from "./reducers/homeSlice";
import categorySlice from "./reducers/categorySlice";
import businessSlice from "./reducers/businessSlice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    home: homeSlice.reducer,
    category: categorySlice.reducer,
    business: businessSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
