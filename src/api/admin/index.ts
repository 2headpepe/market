import { AxiosPromise } from "axios";
import Endpoints from "../endpoints";
import { axiosInstance } from "../instance";
import { ICreateCategoryRequest, IDeleteCategoryRequest, IDeleteDepositRequest, IDeleteUserRequest, IDeleteWithdrawRequest, IGetDepositsResponse, IGetWithdrawsResponse, IPaginationUsersResponse, } from "./types";

export const getUsers = (): AxiosPromise<IPaginationUsersResponse> => axiosInstance.get(Endpoints.ADMIN.GET_USERS);

export const deleteUser = (data:IDeleteUserRequest): AxiosPromise<void> => axiosInstance.delete(Endpoints.ADMIN.DELETE_USER+data.id);

export const createCategory = (data:ICreateCategoryRequest): AxiosPromise<void> => axiosInstance.post(Endpoints.ADMIN.CREATE_CATEGORY,data);

export const deleteCategory = (data:IDeleteCategoryRequest): AxiosPromise<void> => axiosInstance.delete(Endpoints.ADMIN.DELETE_CATEGORY+data.categoryId);

export const getWithdraws = (): AxiosPromise<IGetWithdrawsResponse> => axiosInstance.get(Endpoints.ADMIN.GET_WITHDRAWS);

export const deleteWithdraw = (params:IDeleteWithdrawRequest): AxiosPromise<void> => axiosInstance.delete(Endpoints.ADMIN.DELETE_WITHDRAW+params.withdrawId+'?approved='+params.approved);

export const getDeposits = (): AxiosPromise<IGetDepositsResponse> => axiosInstance.get(Endpoints.ADMIN.GET_DEPOSITS);

export const deleteDeposit = (params:IDeleteDepositRequest): AxiosPromise<void> => axiosInstance.delete(Endpoints.ADMIN.DELETE_DEPOSITS+params.depositId+'?approved='+params.approved);






