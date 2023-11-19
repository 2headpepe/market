import { AxiosPromise } from "axios";
import Endpoints from "../endpoints";
import { axiosInstance } from "../instance";
import { IPaginationDepositRequest} from "../deposit/types";

export const deposit = (params:IPaginationDepositRequest): AxiosPromise<void> =>{
  return axiosInstance.post(Endpoints.DEPOSIT,params);
}

