/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch } from "@reduxjs/toolkit";
import {
  buyListingFailure,
  buyListingSuccess,
  createListingFailure,
  deleteListingFailure,
  deleteListingSuccess,
  getListingFailure,
  getListingStart,
  getListingSuccess,
  getMyFailure,
  getMyStart,
  getMySuccess,
  getUserListingsFailure,
  getUserListingsStart,
  getUserListingsSuccess,
  searchListingsFailure,
  searchListingsStart,
  searchListingsSuccess,
} from "./listingsReducer";
import {
  IBuyListingRequest,
  ICreateListingRequest,
  IDeleteListingRequest,
  IGetListingRequest,
  IGetMyListingsRequest,
  IGetUserListingsRequest,
  ISearchListingsRequest,
} from "../../api/listings/types";
import api from "../../api";
import { postListingImage } from "../images/actionCreators";

export const createListing =
  (data: ICreateListingRequest, images: File[] | null) =>
  async (dispatch: Dispatch<any>): Promise<void> => {
    try {
      const res = (await api.listings.createListing(data)).data;
      if (images) {
        dispatch(
          postListingImage({
            listingId: res.id,
            images,
          })
        )
      }
      
    } catch (e: any) {
      console.error(e);

      dispatch(createListingFailure({ error: e.message }));
    }
  };
export const getListing =
  (data: IGetListingRequest) =>
  async (dispatch: Dispatch<any>): Promise<void> => {
    try {
      dispatch(getListingStart());

      const result = await (await api.listings.getListing(data)).data;

      dispatch(getListingSuccess(result));
    } catch (e: any) {
      console.error(e);

      dispatch(getListingFailure({ error: e.message }));
    }
  };

export const buyListing =
  (data: IBuyListingRequest) =>
  async (dispatch: Dispatch<any>): Promise<void> => {
    try {
      await api.listings.buyListing(data);
      dispatch(buyListingSuccess(data.id))
    } catch (e: any) {
      console.error(e);

      dispatch(buyListingFailure({ error: e.message }));
    }
  };
export const deleteListing =
  (data: IDeleteListingRequest) =>
  async (dispatch: Dispatch<any>): Promise<void> => {
    try {
      await api.listings.deleteListing(data);
      dispatch(deleteListingSuccess(data.id))
    } catch (e: any) {
      console.error(e);

      dispatch(deleteListingFailure({ error: e.message }));
    }
  };

export const getUserListings =
  (data: IGetUserListingsRequest) =>
  async (dispatch: Dispatch<any>): Promise<void> => {
    try {
      dispatch(getUserListingsStart(data));

      const result = (await api.listings.getUserListings(data)).data;

      dispatch(getUserListingsSuccess({ listings: result }));
    } catch (e: any) {
      console.error(e);

      dispatch(getUserListingsFailure({ error: e.message }));
    }
  };
export const searchListings =
  (data: ISearchListingsRequest) =>
  async (dispatch: Dispatch<any>): Promise<void> => {
    try {
      dispatch(searchListingsStart());

      const result = (await api.listings.searchListings(data)).data;
      console.log(result);
      dispatch(searchListingsSuccess({ listings: result }));
    } catch (e: any) {
      console.error(e);

      dispatch(searchListingsFailure({ error: e.message }));
    }
  };

export const getMyListings =
  (data: IGetMyListingsRequest) =>
  async (dispatch: Dispatch<any>): Promise<void> => {
    try {
      dispatch(getMyStart());

      const result = (await api.listings.getMyListings(data)).data;

      dispatch(getMySuccess({ listings: result }));
    } catch (e: any) {
      console.error(e);

      dispatch(getMyFailure({ error: e.message }));
    }
  };
