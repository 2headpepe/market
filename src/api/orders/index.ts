import { AxiosPromise } from "axios";
import Endpoints from "../endpoints";
import { axiosInstance } from "../instance";
import {
  IApprove,
  IDisapprove,
  IGetBuysResponse,
  IGetSellsResponse,
  IOrderResponse,
} from "./types";

export const disapprove = (params: IDisapprove): AxiosPromise<IOrderResponse> =>
  axiosInstance.post(Endpoints.ORDERS.DISAPPROVE + "/" + params.orderId);
export const approve = (params: IApprove): AxiosPromise<IOrderResponse> =>
  axiosInstance.post(Endpoints.ORDERS.APPROVE + "/" + params.orderId);

export const getDisapprovedSells = (): AxiosPromise<IGetSellsResponse> =>
  axiosInstance.get(Endpoints.ORDERS.DISAPPROVED_SELLS);
export const getDisapprovedBuys = (): AxiosPromise<IGetBuysResponse> =>
  axiosInstance.get(Endpoints.ORDERS.DISAPPROVED_BUYS);

export const getApprovedSells = (): AxiosPromise<IGetSellsResponse> =>
  axiosInstance.get(Endpoints.ORDERS.APPROVED_SELLS);
export const getApprovedBuys = (): AxiosPromise<IGetBuysResponse> =>
  axiosInstance.get(Endpoints.ORDERS.APPROVED_BUYS);

export const getActiveSells = (): AxiosPromise<IGetSellsResponse> =>
  axiosInstance.get(Endpoints.ORDERS.ACTIVE_SELLS);
export const getActiveBuys = (): AxiosPromise<IGetBuysResponse> =>
  axiosInstance.get(Endpoints.ORDERS.ACTIVE_BUYS);
