import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPaginationOrders } from "../../api/orders/types";


export interface OrdersState {
  disapprovedSells: {
    listings: IPaginationOrders | null;
    isLoading: boolean;
    error: string | null;
  };
  disapprovedBuys:{
    listings: IPaginationOrders | null;
    isLoading: boolean;
    error: string | null;
  };
  approvedSells: {
    listings: IPaginationOrders | null;
    isLoading: boolean;
    error: string | null;
  };
  approvedBuys:{
    listings: IPaginationOrders | null;
    isLoading: boolean;
    error: string | null;
  };
  activeSells: {
    listings: IPaginationOrders| null;
    isLoading: boolean;
    error: string | null;
  };
  activeBuys:{
    listings: IPaginationOrders | null;
    isLoading: boolean;
    error: string | null;
  };
}

const initialState: OrdersState = {
  disapprovedSells: {
    listings: null,
    isLoading: false,
    error: null,
  },
  disapprovedBuys: {
    listings: null,
    isLoading: false,
    error: null,
  },
  approvedSells: {
    listings: null,
    isLoading: false,
    error: null,
  },
  approvedBuys:{
    listings: null,
    isLoading: false,
    error: null,
  },
  activeSells: {
    listings: null,
    isLoading: false,
    error: null,
  },
  activeBuys:{
    listings: null,
    isLoading: false,
    error: null,
  },
}

export interface OrdersAction{
  listings?:IPaginationOrders;
  error?:string;
}

export const ordersReducer = createSlice({
  name: "orders",
  initialState,
  reducers: {
    getDisapprovedBuysStart: (state,action:PayloadAction<OrdersAction>): OrdersState=> ({
      ...state,
      disapprovedBuys: {
        ...state.disapprovedBuys,
        isLoading: true,
      },
    }),
    getDisapprovedBuysSuccess: (state, action: PayloadAction<OrdersAction>): OrdersState=> ({
        ...state,
        disapprovedBuys: {
          ...state.disapprovedBuys,
          listings:action.payload.listings!,
          isLoading: false,
          error: null,
        },
      }),
    getDisapprovedBuysFailure: (state, action: PayloadAction<OrdersAction>): OrdersState => ({
      ...state,
      disapprovedBuys: {
        ...state.disapprovedBuys,
        isLoading: false,
        error: action.payload.error!,
      },
    }),
    getDisapprovedSellsStart: (state,action:PayloadAction<OrdersAction>): OrdersState=> ({
      ...state,
      disapprovedSells: {
        ...state.disapprovedSells,
        isLoading: true,
      },
    }),
    getDisapprovedSellsSuccess: (state, action: PayloadAction<OrdersAction>): OrdersState=> ({
        ...state,
        disapprovedSells: {
          ...state.disapprovedSells,
          listings:action.payload.listings!,
          isLoading: false,
          error: null,
        },
      }),
    getDisapprovedSellsFailure: (state, action: PayloadAction<OrdersAction>): OrdersState => ({
      ...state,
      disapprovedSells: {
        ...state.disapprovedSells,
        isLoading: false,
        error: action.payload.error!,
      },
    }),


    getApprovedBuysStart: (state,action:PayloadAction<OrdersAction>): OrdersState=> ({
      ...state,
      approvedBuys: {
        ...state.approvedBuys,
        isLoading: true,
      },
    }),
    getApprovedBuysSuccess: (state, action: PayloadAction<OrdersAction>): OrdersState=> ({
        ...state,
        approvedBuys: {
          ...state.approvedBuys,
          listings:action.payload.listings!,
          isLoading: false,
          error: null,
        },
      }),
    getApprovedBuysFailure: (state, action: PayloadAction<OrdersAction>): OrdersState => ({
      ...state,
      approvedBuys: {
        ...state.approvedBuys,
        isLoading: false,
        error: action.payload.error!,
      },
    }),
    getApprovedSellsStart: (state,action:PayloadAction<OrdersAction>): OrdersState=> ({
      ...state,
      approvedSells: {
        ...state.approvedSells,
        isLoading: true,
      },
    }),
    getApprovedSellsSuccess: (state, action: PayloadAction<OrdersAction>): OrdersState=> ({
        ...state,
        approvedSells: {
          ...state.approvedSells,
          listings:action.payload.listings!,
          isLoading: false,
          error: null,
        },
      }),
    getApprovedSellsFailure: (state, action: PayloadAction<OrdersAction>): OrdersState => ({
      ...state,
      approvedSells: {
        ...state.approvedSells,
        isLoading: false,
        error: action.payload.error!,
      },
    }),

    getActiveBuysStart: (state,action:PayloadAction<OrdersAction>): OrdersState=> ({
      ...state,
      activeBuys: {
        ...state.activeBuys,
        isLoading: true,
      },
    }),
    getActiveBuysSuccess: (state, action: PayloadAction<OrdersAction>): OrdersState=> ({
        ...state,
        activeBuys: {
          ...state.activeBuys,
          listings:action.payload.listings!,
          isLoading: false,
          error: null,
        },
      }),
    getActiveBuysFailure: (state, action: PayloadAction<OrdersAction>): OrdersState => ({
      ...state,
      activeBuys: {
        ...state.activeBuys,
        isLoading: false,
        error: action.payload.error!,
      },
    }),
    getActiveSellsStart: (state,action:PayloadAction<OrdersAction>): OrdersState=> ({
      ...state,
      activeSells: {
        ...state.activeSells,
        isLoading: true,
      },
    }),
    getActiveSellsSuccess: (state, action: PayloadAction<OrdersAction>): OrdersState=> ({
        ...state,
        activeSells: {
          ...state.activeSells,
          listings:action.payload.listings!,
          isLoading: false,
          error: null,
        },
      }),
    getActiveSellsFailure: (state, action: PayloadAction<OrdersAction>): OrdersState => ({
      ...state,
      activeSells: {
        ...state.activeSells,
        isLoading: false,
        error: action.payload.error!,
      },
    }),
    
  },
});

export const {
  getApprovedBuysStart,
  getApprovedBuysSuccess,
  getApprovedBuysFailure,
  getApprovedSellsStart,
  getApprovedSellsSuccess,
  getApprovedSellsFailure,
  getDisapprovedBuysStart,
  getDisapprovedBuysSuccess,
  getDisapprovedBuysFailure,
  getDisapprovedSellsStart,
  getDisapprovedSellsSuccess,
  getDisapprovedSellsFailure,
  getActiveBuysStart,
  getActiveBuysSuccess,
  getActiveBuysFailure,
  getActiveSellsStart,
  getActiveSellsSuccess,
  getActiveSellsFailure,
} = ordersReducer.actions;

export default ordersReducer.reducer;
