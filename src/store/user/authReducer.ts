import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserProfile } from "../../api/user/types";

export interface AuthState {
  profileData: {
    profile: IUserProfile | null;
    isLoading: boolean;
    error: string | null;
  };
  userData: {
    profile: IUserProfile | null;
    isLoading: boolean;
    error: string | null;
  };
}

const initialState: AuthState = {
  profileData: {
    profile: null,
    isLoading: false,
    error: null,
  },
  userData: {
    profile: null,
    isLoading: false,
    error: null,
  },
}

export const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
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
    loadUserStart: (state): AuthState => ({
      ...state,
      userData: {
        ...state.userData,
        isLoading: true,
      },
    }),
    loadUserSuccess: (state, action: PayloadAction<IUserProfile>): AuthState => ({
      ...state,
      userData: {
        ...state.userData,
        profile: action.payload,
        isLoading: false,
        error: null,
      },
    }),
    loadUserFailure: (state, action: PayloadAction<string>): AuthState => ({
      ...state,
      userData: {
        ...state.userData,
        isLoading: false,
        error: action.payload,
      },
    }),
  },
});

export const {
  loadProfileStart,
  loadProfileSuccess,
  loadProfileFailure,
  loadUserStart,loadUserSuccess,
  loadUserFailure
} = userReducer.actions;

export default userReducer.reducer;
