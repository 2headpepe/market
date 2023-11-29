import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserProfile } from "../../api/user/types";

export interface UserState {
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
  allUsers: {
    [id: string]: {
      find(arg0: (user: import("../../api/admin/types").IUser) => boolean): unknown;
      profile: IUserProfile | null;
      isLoading: boolean;
      error: string | null;
    };
  };
}

const initialState: UserState = {
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
  allUsers: {},
};

export const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    loadProfileStart: (state): UserState => ({
      ...state,
      profileData: {
        ...state.profileData,
        isLoading: true,
      },
    }),
    loadProfileSuccess: (
      state,
      action: PayloadAction<IUserProfile>
    ): UserState => ({
      ...state,
      profileData: {
        ...state.profileData,
        profile: action.payload,
        isLoading: false,
        error: null,
      },
    }),
    loadProfileFailure: (state, action: PayloadAction<string>): UserState => ({
      ...state,
      profileData: {
        ...state.profileData,
        isLoading: false,
        error: action.payload,
      },
    }),
    loadUserStart: (state, action: PayloadAction<number>): UserState => ({
      ...state,
      userData: {
        ...state.userData,
        isLoading: true,
      },
      allUsers: {
        ...state.allUsers,
        [action.payload]: {
          ...state.allUsers[action.payload],
          isLoading: true,
        },
      },
    }),
    loadUserSuccess: (
      state,
      action: PayloadAction<IUserProfile>
    ): UserState => ({
      ...state,
      userData: {
        ...state.userData,
        profile: action.payload,
        isLoading: false,
        error: null,
      },
      allUsers: {
        ...state.allUsers,
        [action.payload.id]: {
          ...state.allUsers[action.payload.id],
          profile: action.payload,
        },
      },
    }),
    loadUserFailure: (state, action: PayloadAction<string>): UserState => ({
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
  loadUserStart,
  loadUserSuccess,
  loadUserFailure,
} = userReducer.actions;

export default userReducer.reducer;
