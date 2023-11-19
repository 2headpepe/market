import { AxiosPromise } from "axios";
import Endpoints from "../endpoints";
import { axiosInstance } from "../instance";
import { IGetBuysResponse, IGetSellsResponse } from "./types";


export const getDisapprovedSells = (): AxiosPromise<IGetSellsResponse> => axiosInstance.get(Endpoints.ORDERS.DISAPPROVED_SELLS)
export const getDisapprovedBuys = (): AxiosPromise<IGetBuysResponse> => axiosInstance.get(Endpoints.ORDERS.DISAPPROVED_BUYS)

export const getApprovedSells = (): AxiosPromise<IGetSellsResponse> => axiosInstance.get(Endpoints.ORDERS.APPROVED_SELLS)
export const getApprovedBuys = (): AxiosPromise<IGetBuysResponse> => axiosInstance.get(Endpoints.ORDERS.APPROVED_BUYS)

export const getActiveSells = (): AxiosPromise<IGetSellsResponse> => axiosInstance.get(Endpoints.ORDERS.ACTIVE_SELLS)
export const getActiveBuys = (): AxiosPromise<IGetBuysResponse> => axiosInstance.get(Endpoints.ORDERS.ACTIVE_BUYS)