import { AxiosPromise } from "axios";
import Endpoints from "../endpoints";
import { axiosInstance } from "../instance";
import {
  IDeleteImageRequest,
  IGetListingImagesRequest,
  IGetListingImagesResponse,
  IPostListingImageRequest,
  IPostListingImageResponse,
} from "./types";

export const getListingImages = (
  params: IGetListingImagesRequest
): AxiosPromise<IGetListingImagesResponse> => {
  return axiosInstance.get(
    Endpoints.IMAGES.LISTING_IMAGES + "/" + params.listingId
  );
};

export const postListingImageApi = (
  params: IPostListingImageRequest
): AxiosPromise<IPostListingImageResponse> => {
  return axiosInstance.post(
    Endpoints.IMAGES.LISTING_IMAGES + "/" + params.listingId, {path:params.path}
  );
};

export const deleteImage = (
  params: IDeleteImageRequest
): AxiosPromise<void> => {
  return axiosInstance.delete(
    Endpoints.IMAGES.LISTING_IMAGES + "/" + params.imageId
  );
};
