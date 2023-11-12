import { AxiosPromise } from "axios";
import Endpoints from "../endpoints";
import { axiosInstance } from "../instance";
import { IGetListingImagesRequest, IGetListingImagesResponse } from "./types";

export const getListingImages = (params:IGetListingImagesRequest): AxiosPromise<IGetListingImagesResponse> =>{
  return  axiosInstance.get(Endpoints.IMAGES.LISTING_IMAGES+params.listingsId);
}

