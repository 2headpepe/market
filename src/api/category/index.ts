import { AxiosPromise } from "axios";
import Endpoints from "../endpoints";
import { axiosInstance } from "../instance";
import { ICategories, ICategory, IGetCategoryRequest } from "./types";

export const getCategories = (): AxiosPromise<ICategories> =>{
  return axiosInstance.get(Endpoints.CATEGORY.GET_CATEGORIES);
}

export const getCategory = (data:IGetCategoryRequest): AxiosPromise<ICategory> =>{
  return axiosInstance.get(Endpoints.CATEGORY.GET_CATEGORY+data.categoryId);
}


