import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ILoginResponse, IUserProfile } from "../../api/auth/types";

export interface AuthState {
  authData: {
    accessToken: string | null;
    role:"ADMIN"|"USER"|null;
    isLoading: boolean;
    error: string | null;
  };
  profileData: {
    profile: IUserProfile | null;
    isLoading: boolean;
    error: string | null;
  };
}

const initialState: AuthState = {
  authData: {
    accessToken: null,
    role:null,
    isLoading: false,
    error: null,
  },
  profileData: {
    profile: null,
    isLoading: false,
    error: null,
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
      },
    }),
    registerSuccess: (state, action: PayloadAction<string>): AuthState => {
      
      return {...state};
      // authData: {
      //   ...state.authData,
      //   accessToken: action.payload,
      //   isLoading: false,
      //   error: null,
      // },
    },
    registerFailure: (state, action: PayloadAction<string>): AuthState => ({
      ...state,
      authData: {
        ...state.authData,
        isLoading: false,
        error: action.payload,
      },
    }),
    loadProfileStart: (state): AuthState => ({
      ...state,
      profileData: {
        ...state.profileData,
        isLoading: true,
      },
    }),
    loadProfileSuccess: (state, action: PayloadAction<IUserProfile>): AuthState => ({
      ...state,
      profileData: {
        ...state.profileData,
        profile: action.payload,
        isLoading: false,
        error: null,
      },
    }),
    loadProfileFailure: (state, action: PayloadAction<string>): AuthState => ({
      ...state,
      profileData: {
        ...state.profileData,
        isLoading: false,
        error: action.payload,
      },
    }),
    logoutSuccess: (): AuthState => initialState,
  },
});

export const {
  loadProfileStart,
  loadProfileSuccess,
  loadProfileFailure,
  loginStart,
  loginSuccess,
  loginFailure,
  logoutSuccess,
  registerStart,
  registerSuccess,
  registerFailure
} = authReducer.actions;

export default authReducer.reducer;
