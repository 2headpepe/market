import { configureStore,} from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import authReducer from "./auth/authReducer";
import listingsReducer from "./listings/listingsReducer";
import imagesReducer from "./images/imagesReducer";
import ordersReducer from "./orders/ordersReducer";
import adminReducer from "./admin/adminReducer";
import categoryReducer from "./category/categoryReducer";
import  userReducer from "./user/authReducer";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    listings:listingsReducer,
    images:imagesReducer,
    orders:ordersReducer,
    admin:adminReducer,
    category:categoryReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
});

export type IRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
