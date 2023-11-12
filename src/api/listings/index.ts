import { AxiosPromise } from "axios";
import Endpoints from "../endpoints";
import { axiosInstance } from "../instance";
import { IBuyListingRequest, IBuyListingRespose, ICreateListingRequest, ICreateListingResponse, IDeleteListingRequest, IGetListingRequest, IGetListingResponse, IGetListingsResponse, IGetUserListingsRequest, IListing, IListings, ISearchListingsRequest } from "./types";

export const createListing = (data:ICreateListingRequest): AxiosPromise<ICreateListingResponse> => axiosInstance.post(Endpoints.LISTINGS.CREATE_LISTING,data);

export const getListing = (data:IGetListingRequest):AxiosPromise<IGetListingResponse> => axiosInstance.get(Endpoints.LISTINGS.GET_LISTING+data.id);

export const buyListing = (data:IBuyListingRequest):AxiosPromise<IBuyListingRespose> => axiosInstance.post(Endpoints.LISTINGS.BUY_LISTING,data);

export const deleteListing = (data:IDeleteListingRequest):AxiosPromise<void> => axiosInstance.delete(Endpoints.LISTINGS.DELETE_LISTING);

export const getUserListings = (data:IGetUserListingsRequest):AxiosPromise<IGetListingsResponse> => axiosInstance.get(Endpoints.LISTINGS.USER_LISTINGS);

export const searchListings = (data:ISearchListingsRequest):AxiosPromise<IGetListingsResponse> => {
    let query = data.categoryId!==undefined?'categoryId='+data.categoryId:'';
    query+=data.priceOrder!==undefined?'&priceOrder='+data.priceOrder:''
    query+=data.postDateOrder!==undefined?'&postDateOrder='+data.postDateOrder:''
    return axiosInstance.get(Endpoints.LISTINGS.USER_LISTINGS+query);
}

export const getMyListings = (): AxiosPromise<IGetListingsResponse> => axiosInstance.get(Endpoints.LISTINGS.MY_LISTINGS)
