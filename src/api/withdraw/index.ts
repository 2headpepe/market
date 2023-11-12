import { AxiosPromise } from "axios";
import Endpoints from "../endpoints";
import { axiosInstance } from "../instance";
import { IDepositRequest} from "../deposit/types";
import { ICreateWithdrawRequest } from "./types";

export const withdraws = (params:ICreateWithdrawRequest): AxiosPromise<void> =>{
  return axiosInstance.post(Endpoints.WITHDRAW, params);
}

