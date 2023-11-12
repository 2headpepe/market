import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import logger from "redux-logger";
import authReducer from "./auth/authReducer";
import listingsReducer from "./listings/listingsReducer";
import imagesReducer from "./images/imagesReducer";
import ordersReducer from "./orders/ordersReducer";
import adminReducer from "./admin/adminReducer";
import categoryReducer from "./category/categoryReducer";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    listings:listingsReducer,
    images:imagesReducer,
    orders:ordersReducer,
    admin:adminReducer,
    category:categoryReducer
    // user: user,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      ...(process.env.NODE_ENV !== "production" ? [logger] : [])
    ),
});

export type IRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
