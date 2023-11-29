import { AxiosPromise } from "axios";
import Endpoints from "../endpoints";
import { axiosInstance } from "../instance";
import {
  IGetReviewsRequest,
  IPostReviewRequest,
  IReview,
  IReviewsResponse,
} from "./types";
import { IPaginationParams } from "../types";

export const getMyReviews = (
  params: IPaginationParams
): AxiosPromise<IReviewsResponse> =>
  axiosInstance.get(
    Endpoints.REVIEWS.GET_MY_REVIEW +
      "/" +
      "?offset=" +
      params.offset +
      "&limit=" +
      params.limit
  );
export const getReviews = (
  params: IGetReviewsRequest
): AxiosPromise<IReviewsResponse> =>
  axiosInstance.get(
    Endpoints.REVIEWS.GET_REVIEWS +
      "/" +
      params.sellerId +
      "?offset=" +
      params.offset +
      "&limit=" +
      params.limit
  );

export const postReview = (params: IPostReviewRequest): AxiosPromise<IReview> =>
  axiosInstance.post(Endpoints.REVIEWS.GET_REVIEWS + "/" + params.sellerId,{text:params.text,rating:params.rating});
