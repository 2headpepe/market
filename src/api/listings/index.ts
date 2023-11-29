import { AxiosPromise } from "axios";
import Endpoints from "../endpoints";
import { axiosInstance } from "../instance";
import {
  IBuyListingRequest,
  IBuyListingRespose,
  ICreateListingRequest,
  ICreateListingResponse,
  IDeleteListingRequest,
  IGetListingRequest,
  IGetListingResponse,
  IGetListingsResponse,
  IGetMyListingsRequest,
  IGetUserListingsRequest,
  ISearchListingsRequest,
} from "./types";

export const createListing = (
  data: ICreateListingRequest
): AxiosPromise<ICreateListingResponse> =>
  axiosInstance.post(Endpoints.LISTINGS.CREATE_LISTING, data);

export const getListing = (
  data: IGetListingRequest
): AxiosPromise<IGetListingResponse> =>
  axiosInstance.get(Endpoints.LISTINGS.GET_LISTING + data.id);

export const buyListing = (
  data: IBuyListingRequest
): AxiosPromise<IBuyListingRespose> =>
  axiosInstance.post(Endpoints.LISTINGS.BUY_LISTING + data.id);

export const deleteListing = (
  data: IDeleteListingRequest
): AxiosPromise<void> =>
  axiosInstance.post(Endpoints.LISTINGS.DELETE_LISTING +'/'+ data.id);

export const getUserListings = (
  data: IGetUserListingsRequest
): AxiosPromise<IGetListingsResponse> =>
  axiosInstance.get(Endpoints.LISTINGS.USER_LISTINGS + data.userId);

export const searchListings = (
  data: ISearchListingsRequest
): AxiosPromise<IGetListingsResponse> => {
  let query = "?";
  // let e: keyof typeof data;
  for (const e of ["categoryId", "sortBy", "asc", "offset", "limit"]) {
    if (
      data[e as keyof typeof data] === undefined ||
      data[e as keyof typeof data] === null
    )
      continue;
    if (query !== "?") {
      query += "&" + e + "=" + data[e as keyof typeof data];
    } else {
      query += e + "=" + data[e as keyof typeof data];
    }
  }
  return axiosInstance.get(
    Endpoints.LISTINGS.SEARCH_LISTINGS + (query === "?" ? "" : query)
  );
};
export const getMyListings = (
  params: IGetMyListingsRequest
): AxiosPromise<IGetListingsResponse> =>
  axiosInstance.get(
    Endpoints.LISTINGS.MY_LISTINGS +
    "?offset=" +
    params.offset +
    "&limit=" +
    params.limit
  );
