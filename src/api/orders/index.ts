import { AxiosPromise } from "axios";
import Endpoints from "../endpoints";
import { axiosInstance } from "../instance";
import { IGetBuysResponse, IGetSellsResponse } from "./types";


export const getMySells = (): AxiosPromise<IGetSellsResponse> => axiosInstance.get(Endpoints.ORDERS.SELLS)
export const getMyBuys = (): AxiosPromise<IGetBuysResponse> => axiosInstance.get(Endpoints.ORDERS.BUYS)
