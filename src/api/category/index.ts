import { AxiosPromise } from "axios";
import Endpoints from "../endpoints";
import { axiosInstance } from "../instance";
import { IDepositRequest} from "../deposit/types";
import { ICategories, IGetCategoryRequest } from "./types";

export const getCategories = (): AxiosPromise<ICategories> =>{
  return axiosInstance.get(Endpoints.CATEGORY.GET_CATEGORIES);
}

export const getCategory = (data:IGetCategoryRequest): AxiosPromise<ICategories> =>{
  return axiosInstance.get(Endpoints.CATEGORY.GET_CATEGORY+data.categoryId);
}


