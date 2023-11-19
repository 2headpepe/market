import { AxiosPromise } from "axios";
import Endpoints from "../endpoints";
import { axiosInstance } from "../instance";
import { IBuyListingRequest, IBuyListingRespose, ICreateListingRequest, ICreateListingResponse, IDeleteListingRequest, IGetListingRequest, IGetListingResponse, IGetListingsResponse, IGetMyListingsRequest, IGetUserListingsRequest, IListing, IListings, ISearchListingsRequest } from "./types";
import { IPaginationParams } from "../types";

export const createListing = (data:ICreateListingRequest): AxiosPromise<ICreateListingResponse> => axiosInstance.post(Endpoints.LISTINGS.CREATE_LISTING,data);

export const getListing = (data:IGetListingRequest):AxiosPromise<IGetListingResponse> => axiosInstance.get(Endpoints.LISTINGS.GET_LISTING+data.id);

export const buyListing = (data:IBuyListingRequest):AxiosPromise<IBuyListingRespose> => axiosInstance.post(Endpoints.LISTINGS.BUY_LISTING+data.id);

export const deleteListing = (data:IDeleteListingRequest):AxiosPromise<void> => axiosInstance.delete(Endpoints.LISTINGS.DELETE_LISTING+data.id);

export const getUserListings = (data:IGetUserListingsRequest):AxiosPromise<IGetListingsResponse> => axiosInstance.get(Endpoints.LISTINGS.USER_LISTINGS+data.id);

export const searchListings = (data:ISearchListingsRequest):AxiosPromise<IGetListingsResponse> => {
    let query='?';
    // let e: keyof typeof data;
    for(let e of ['categoryId','sortBy','asc','offset','limit']){
        console.log(e)
        if(data[e as keyof typeof data]===undefined ||data[e as keyof typeof data]===null ) continue;
        if(query!=='?'){
            query+='&'+e+'='+data[e  as keyof typeof data];
        }else{
            query+=e+'='+data[e  as keyof typeof data];
        }
    }
    console.log(query,data)
    return axiosInstance.get(Endpoints.LISTINGS.SEARCH_LISTINGS+(query==='?'?'':query));
}
export const getMyListings = (params:IGetMyListingsRequest): AxiosPromise<IGetListingsResponse> => axiosInstance.get(Endpoints.LISTINGS.MY_LISTINGS)
