import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDeposit, IGetDepositsResponse, IGetWithdrawsResponse, IUsers, IWithdraw } from "../../api/admin/types";
import { IPaginationDepositRequest } from "../../api/deposit/types";

export interface AdminState {
  usersData: {
    users: IUsers | null;
    isLoading: boolean;
    error: string | null;
  };
  withdrawsData: {
    withdraws: IGetWithdrawsResponse | null;
    isLoading: boolean;
    error: string | null;
  },
  depositsData: {
    deposits: IGetDepositsResponse| null;
    isLoading: boolean;
    error: string | null;
  },
  deleteUserErrors:{
    [id:string]:string;
  },
  deleteCategoryErrors:{
    [id:string]:string;
  },
  deleteWithdrawErrors:{
    [id:string]:string;
  },
  deleteDepositErrors:{
    [id:string]:string;
  },
  createCategoryErrors:string[]
}
export interface IDeleteError{
  error:string;
  id:number;
}
const initialState: AdminState = {
  usersData: {
    users: null,
    isLoading: false,
    error: null,
  },
  withdrawsData: {
    withdraws: null,
    isLoading: false,
    error: null,
  },
  depositsData: {
    deposits: null,
    isLoading: false,
    error: null,
  },
  deleteUserErrors:{},
  deleteCategoryErrors:{},
  deleteWithdrawErrors:{},
  deleteDepositErrors:{},
  createCategoryErrors:[]
}

export const adminReducer = createSlice({
  name: "admin",
  initialState,
  reducers: {
    getUsersStart: (state): AdminState => ({
      ...state,
      usersData: {
        ...state.usersData,
        isLoading: true,
      },
    }),
    getUsersSuccess: (state, action: PayloadAction<IUsers>): AdminState => ({
      ...state,
      usersData: {
        ...state.usersData,
        users: action.payload,
        isLoading: false,
        error: null,
      },
    }),
    getUsersFailure: (state, action: PayloadAction<string>): AdminState => ({
      ...state,
      usersData: {
        ...state.usersData,
        isLoading: false,
        error: action.payload,
      },
    }),
    getWithdrawsStart: (state): AdminState => ({
      ...state,
      withdrawsData: {
        ...state.withdrawsData,
        isLoading: true,
      },
    }),
    getWithdrawsSuccess: (state, action: PayloadAction<IGetWithdrawsResponse>): AdminState => ({
      ...state,
      withdrawsData: {
        ...state.withdrawsData,
        withdraws: action.payload,
        isLoading: false,
        error: null,
      },
    }),
    getWithdrawsFailure: (state, action: PayloadAction<string>): AdminState => ({
      ...state,
      withdrawsData: {
        ...state.withdrawsData,
        isLoading: false,
        error: action.payload,
      },
    }),
    getDepositsStart: (state): AdminState => ({
      ...state,
      depositsData: {
        ...state.depositsData,
        isLoading: true,
      },
    }),
    getDepositsSuccess: (state, action: PayloadAction<IGetDepositsResponse>): AdminState => ({
      ...state,
      depositsData: {
        ...state.depositsData,
        deposits: action.payload,
        isLoading: false,
        error: null,
      },
    }),
    getDepositsFailure: (state, action: PayloadAction<string>): AdminState => ({
      ...state,
      depositsData: {
        ...state.depositsData,
        isLoading: false,
        error: action.payload,
      },
    }),
    
    createCategoryFailure: (state, action: PayloadAction<string>): AdminState => ({
      ...state,
      createCategoryErrors: [
        ...state.createCategoryErrors,
        action.payload
      ],
    }),
    deleteCategoryFailure: (state, action: PayloadAction<IDeleteError>): AdminState => ({
      ...state,
      deleteCategoryErrors: {
        ...state.deleteCategoryErrors,
        [action.payload.id]:action.payload.error,
      },
    }),
    deleteUserFailure: (state, action: PayloadAction<IDeleteError>): AdminState => ({
      ...state,
      deleteUserErrors:{
        ...state.deleteUserErrors,
        [action.payload.id]:action.payload.error,
      }
    }),
    deleteDepositFailure: (state, action: PayloadAction<IDeleteError>): AdminState => ({
      ...state,
      deleteDepositErrors: {
        ...state.deleteDepositErrors,
        [action.payload.id]: action.payload.error,
      },
    }),
    deleteWithdrawFailure: (state, action: PayloadAction<IDeleteError>): AdminState => ({
      ...state,
      deleteWithdrawErrors: {
        ...state.deleteWithdrawErrors,
        [action.payload.id]: action.payload.error,
      },
    }),
  }
});

export const {
  getUsersStart,
  getUsersSuccess,
  getUsersFailure,
  getWithdrawsStart,
  getWithdrawsSuccess,
  getWithdrawsFailure,
  getDepositsStart,
  getDepositsSuccess,
  getDepositsFailure,
  createCategoryFailure,
  deleteCategoryFailure,
  deleteUserFailure,
  deleteDepositFailure,
  deleteWithdrawFailure
} = adminReducer.actions;

export default adminReducer.reducer;
