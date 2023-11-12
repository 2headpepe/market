import { AxiosPromise } from "axios";
import Endpoints from "../endpoints";
import { axiosInstance } from "../instance";
import { IDepositRequest} from "../deposit/types";

export const deposit = (params:IDepositRequest): AxiosPromise<void> =>{
  return axiosInstance.post(Endpoints.DEPOSIT,params);
}

