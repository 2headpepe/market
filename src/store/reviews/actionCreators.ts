/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch } from "@reduxjs/toolkit";
import {
  getMyFailure,
  getMyStart,
  getMySuccess,
  getReviewsFailure,
  getReviewsStart,
  getReviewsSuccess,
} from "./reviewsReducer";
import api from "../../api";
import { IGetReviewsRequest, IPostReviewRequest } from "../../api/reviews/types";
import { IPaginationParams } from "../../api/types";



export const postReview =
  (data: IPostReviewRequest) =>
  async (): Promise<void> => {
    try {
      await api.reviews.postReview(data);
    } catch (e: any) {
      console.error(e);

      // dispatch(buyListingFailure({ error: e.message }));
    }
  };

  export const getUserReviews =
  (data: IGetReviewsRequest) =>
  async (dispatch: Dispatch<any>): Promise<void> => {
    try {
      dispatch(getReviewsStart({id:data.sellerId}));

      const result = (await api.reviews.getReviews(data)).data;

      dispatch(getReviewsSuccess({ id:data.sellerId,reviews: result }));
    } catch (e: any) {
      console.error(e);

      dispatch(getReviewsFailure({id:data.sellerId, error: e.message }));
    }
  };

export const getMyReviews =
  (data: IPaginationParams) =>
  async (dispatch: Dispatch<any>): Promise<void> => {
    try {
      dispatch(getMyStart());

      const result = (await api.reviews.getMyReviews(data)).data;

      dispatch(getMySuccess(result));
    } catch (e: any) {
      console.error(e);

      dispatch(getMyFailure(e.message));
    }
  };
