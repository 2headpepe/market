import { AxiosPromise } from "axios";
import Endpoints from "../endpoints";
import { axiosInstance } from "../instance";
import {
  ICreateCategoryRequest,
  IDeleteCategoryRequest,
  IDeleteDepositRequest,
  IDeleteListingRequest,
  IDeleteReviewRequest,
  IDeleteUserRequest,
  IDeleteWithdrawRequest,
  IGetDepositsResponse,
  IGetWithdrawsResponse,
  IPaginationUsersResponse,
} from "./types";
import { IPaginationParams } from "../types";

export const getUsers = (
  params: IPaginationParams
): AxiosPromise<IPaginationUsersResponse> =>
  axiosInstance.get(
    Endpoints.ADMIN.GET_USERS +
      "?offset=" +
      params.offset +
      "&limit=" +
      params.limit
  );

export const deleteUser = (data: IDeleteUserRequest): AxiosPromise<void> =>
  axiosInstance.post(Endpoints.ADMIN.DELETE_USER + data.userId);

export const createCategory = (
  data: ICreateCategoryRequest
): AxiosPromise<void> =>
  axiosInstance.post(Endpoints.ADMIN.CREATE_CATEGORY, data);

export const deleteCategory = (
  data: IDeleteCategoryRequest
): AxiosPromise<void> =>
  axiosInstance.delete(Endpoints.ADMIN.DELETE_CATEGORY + data.categoryId);

export const getWithdraws = (
  params: IPaginationParams
): AxiosPromise<IGetWithdrawsResponse> =>
  axiosInstance.get(
    Endpoints.ADMIN.GET_WITHDRAWS +
      "?offset=" +
      params.offset +
      "&limit=" +
      params.limit
  );

export const deleteWithdraw = (
  params: IDeleteWithdrawRequest
): AxiosPromise<void> =>
  axiosInstance.delete(
    Endpoints.ADMIN.DELETE_WITHDRAW +
      params.withdrawId +
      "?approved=" +
      params.approved
  );

export const getDeposits = (
  params: IPaginationParams
): AxiosPromise<IGetDepositsResponse> =>
  axiosInstance.get(
    Endpoints.ADMIN.GET_DEPOSITS +
      "?offset=" +
      params.offset +
      "&limit=" +
      params.limit
  );

export const deleteDeposit = (
  params: IDeleteDepositRequest
): AxiosPromise<void> =>
  axiosInstance.delete(
    Endpoints.ADMIN.DELETE_DEPOSITS +
      params.depositId +
      "?approved=" +
      params.approved
  );

export const deleteListing = (
  params: IDeleteListingRequest
): AxiosPromise<void> =>
  axiosInstance.post(Endpoints.ADMIN.DELETE_LISTING + params.listingId);

export const deleteReview = (
  params: IDeleteReviewRequest
): AxiosPromise<void> =>
  axiosInstance.delete(Endpoints.ADMIN.DELETE_REVIEW + "/" + params.reviewId);
