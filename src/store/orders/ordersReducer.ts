import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IListings } from "../../api/listings/types";

export interface OrdersState {
  sells: {
    listings: IListings | null;
    isLoading: boolean;
    error: string | null;
  };
  buys:{
    listings: IListings | null;
    isLoading: boolean;
    error: string | null;
  };
}

const initialState: OrdersState = {
  sells: {
    listings: null,
    isLoading: false,
    error: null,
  },
  buys: {
    listings: null,
    isLoading: false,
    error: null,
  },
}

export interface OrdersAction{
  listings?:IListings;
  error?:string;
}

export const ordersReducer = createSlice({
  name: "orders",
  initialState,
  reducers: {
    getBuysStart: (state,action:PayloadAction<OrdersAction>): OrdersState=> ({
      ...state,
      buys: {
        ...state.buys,
        isLoading: true,
      },
    }),
    getBuysSuccess: (state, action: PayloadAction<OrdersAction>): OrdersState=> ({
        ...state,
        buys: {
          ...state.buys,
          listings:action.payload.listings!,
          isLoading: false,
          error: null,
        },
      }),
    getBuysFailure: (state, action: PayloadAction<OrdersAction>): OrdersState => ({
      ...state,
      buys: {
        ...state.buys,
        isLoading: false,
        error: action.payload.error!,
      },
    }),
    getSellsStart: (state,action:PayloadAction<OrdersAction>): OrdersState=> ({
      ...state,
      sells: {
        ...state.sells,
        isLoading: true,
      },
    }),
    getSellsSuccess: (state, action: PayloadAction<OrdersAction>): OrdersState=> ({
        ...state,
        sells: {
          ...state.sells,
          listings:action.payload.listings!,
          isLoading: false,
          error: null,
        },
      }),
    getSellsFailure: (state, action: PayloadAction<OrdersAction>): OrdersState => ({
      ...state,
      sells: {
        ...state.sells,
        isLoading: false,
        error: action.payload.error!,
      },
    }),
    
  },
});

export const {
  getBuysStart,
  getBuysSuccess,
  getBuysFailure,
  getSellsStart,
  getSellsSuccess,
  getSellsFailure
} = ordersReducer.actions;

export default ordersReducer.reducer;
