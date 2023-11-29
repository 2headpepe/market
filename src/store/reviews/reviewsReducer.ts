import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPaginationReviews } from "../../api/reviews/types";

export interface ReviewsState {
  myReviews: {
    reviews: IPaginationReviews | null;
    isLoading: boolean;
    error: string | null;
  };
  userReviews: {
    [key: string]: {
      reviews: IPaginationReviews | null;
      isLoading: boolean;
      error: string | null;
    };
  };
}

const initialState: ReviewsState = {
  myReviews: {
    reviews: null,
    isLoading: false,
    error: null,
  },
  userReviews: {},
};

export const reviewsReducer = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    getMyStart: (state): ReviewsState => ({
      ...state,
      myReviews: {
        ...state.myReviews,
        isLoading: true,
      },
    }),
    getMySuccess: (
      state,
      action: PayloadAction<IPaginationReviews>
    ): ReviewsState => ({
      ...state,
      myReviews: {
        ...state.myReviews,
        reviews: action.payload!,
        isLoading: false,
        error: null,
      },
    }),
    getMyFailure: (state, action: PayloadAction<string>): ReviewsState => ({
      ...state,
      myReviews: {
        ...state.myReviews,
        isLoading: false,
        error: action.payload!,
      },
    }),
    getReviewsStart: (
      state,
      action: PayloadAction<{ id: number }>
    ): ReviewsState => ({
      ...state,
      userReviews: {
        ...state.userReviews,
        [action.payload.id!]: {
          ...state.userReviews[action.payload.id!],
          isLoading: true,
        },
      },
    }),
    getReviewsSuccess: (
      state,
      action: PayloadAction<{ id: number; reviews: IPaginationReviews }>
    ): ReviewsState => ({
      ...state,
      userReviews: {
        ...state.userReviews,
        [action.payload.id!]: {
          ...state.userReviews[action.payload.id!],
          reviews: action.payload.reviews!,
          isLoading: false,
          error: null,
        },
      },
    }),
    getReviewsFailure: (
      state,
      action: PayloadAction<{ id: number; error: string }>
    ): ReviewsState => ({
      ...state,
      userReviews: {
        ...state.userReviews,
        [action.payload.id!]: {
          ...state.userReviews[action.payload.id!],
          isLoading: false,
          error: action.payload.error,
        },
      },
    }),
  },
});

export const {
  getMyStart,
  getMySuccess,
  getMyFailure,
  getReviewsStart,
  getReviewsSuccess,
  getReviewsFailure,
} = reviewsReducer.actions;

export default reviewsReducer.reducer;
