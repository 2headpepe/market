import { Dispatch } from "@reduxjs/toolkit"
import {  buyListingFailure, createListingFailure, deleteListingFailure, getListingFailure, getListingStart, getListingSuccess, getMyFailure, getMyStart, getMySuccess, getUserListingsFailure, getUserListingsStart, getUserListingsSuccess, searchListingsFailure, searchListingsStart, searchListingsSuccess } from "./listingsReducer"
import { IBuyListingRequest, ICreateListingRequest, IDeleteListingRequest, IGetListingRequest, IGetMyListingsRequest, IGetUserListingsRequest, IListings, ISearchListingsRequest } from "../../api/listings/types";
import api from "../../api";

export const createListing = (data:ICreateListingRequest) =>
async (dispatch: Dispatch<any>): Promise<void> => {
  try {
    (await api.listings.createListing(data));

  } catch (e: any) {
    console.error(e)

    dispatch(createListingFailure({error:e.message}))
  }
}
export const getListing = (data:IGetListingRequest) =>
async (dispatch: Dispatch<any>): Promise<void> => {
  try {
    dispatch(getListingStart());

    const result = await (await api.listings.getListing(data)).data

    dispatch(getListingSuccess(result))
  } catch (e: any) {
    console.error(e)

    dispatch(getListingFailure({error:e.message}))
  }
}

export const buyListing = (data:IBuyListingRequest) =>
async (dispatch: Dispatch<any>): Promise<void> => {
  try {

    await api.listings.buyListing(data);

  } catch (e: any) {
    console.error(e)

    dispatch(buyListingFailure({error:e.message}))
  }
}
export const deleteListing = (data:IDeleteListingRequest) =>
async (dispatch: Dispatch<any>): Promise<void> => {
  try {

    await api.listings.deleteListing(data);
    
  } catch (e: any) {
    console.error(e)

    dispatch(deleteListingFailure({error:e.message}))
  }
}

export const getUserListings = (data:IGetUserListingsRequest) =>
async (dispatch: Dispatch<any>): Promise<void> => {
  try {
    dispatch(getUserListingsStart(data));

    const result = (await api.listings.getUserListings(data)).data ;

    dispatch(getUserListingsSuccess({listings:result}))
  } catch (e: any) {
    console.error(e)

    dispatch(getUserListingsFailure({error:e.message}))
  }
}
export const searchListings = (data:ISearchListingsRequest) =>
async (dispatch: Dispatch<any>): Promise<void> => {
  try {
    dispatch(searchListingsStart());

    const result = (await api.listings.searchListings(data)).data ;
    console.log(result)
    dispatch(searchListingsSuccess({listings:result}))
  } catch (e: any) {
    console.error(e)

    dispatch(searchListingsFailure({error:e.message}))
  }
}


export const getMyListings = (params:IGetMyListingsRequest) =>
async (dispatch: Dispatch<any>): Promise<void> => {
  try {
    dispatch(getMyStart());

    const result = (await api.listings.getMyListings(params)).data ;

    dispatch(getMySuccess({listings:result}))
  } catch (e: any) {
    console.error(e)

    dispatch(getMyFailure({error:e.message}))
  }
}

