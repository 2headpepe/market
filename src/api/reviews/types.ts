import { IPaginationParams } from "../types";

export type IReviewsResponse = IPaginationReviews;

export interface IPaginationReviews {
  totalPages: number;
  reviewResponseList: IReview[];
}

export interface IReview {
  id: number;
  sellerId: number;
  buyerId: number;
  text: string;
  rating: number;
}

export type IGetReviewsRequest = IPaginationParams & { sellerId: number };
export type IPostReviewRequest = { sellerId: number, text:string, rating:number };
