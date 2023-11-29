import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ILoginResponse, IRegisterResponse} from "../../api/auth/types";

export interface AuthState {
  authData: {
    accessToken: string | null;
    role:"ADMIN"|"USER"|null;
    isLoading: boolean;
    error: string | null;
    regError: string | null;
  };

}

const initialState: AuthState = {
  authData: {
    accessToken: null,
    role:null,
    isLoading: false,
    error: null,
    regError: null,
  },

}

export const authReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state): AuthState => ({
      ...state,
      authData: {
        ...state.authData,
        isLoading: true,
        regError:null,
      },
    }),
    loginSuccess: (state, action: PayloadAction<ILoginResponse>): AuthState => ({
      ...state,
      authData: {
        ...state.authData,
        accessToken: action.payload.access_token,
        role:action.payload.role,
        isLoading: false,
        error: null,
      },
    }),
    loginFailure: (state, action: PayloadAction<string>): AuthState => ({
      ...state,
      authData: {
        ...state.authData,
        isLoading: false,
        error: action.payload,
      },
    }),
    registerStart: (state): AuthState => ({
      ...state,
      authData: {
        ...state.authData,
        isLoading: true,
        error:null,
      },
    }),
    registerSuccess: (state,action:PayloadAction<IRegisterResponse>): AuthState => ({
      ...state,
      authData:{
        ...state.authData,
        isLoading:false,
        accessToken:action.payload.access_token,
      }
    }),
    registerFailure: (state, action: PayloadAction<string>): AuthState => ({
      ...state,
      authData: {
        ...state.authData,
        isLoading: false,
        regError: action.payload,
      },
    }),
    logoutSuccess: (): AuthState => initialState,
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logoutSuccess,
  registerStart,
  registerSuccess,
  registerFailure
} = authReducer.actions;

export default authReducer.reducer;
