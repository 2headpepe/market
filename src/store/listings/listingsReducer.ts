import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {   IListing, IListings, IPaginationListings } from "../../api/listings/types";

export interface ListingsState {
  myListings: {
    listings: IPaginationListings | null;
    isLoading: boolean;
    error: string | null;
  };
  createListingErrors: string[];
  deleteListingErrors: {
    [id:string]:string;
  };
  buyListingErrors: {
    [id:string]:string;
  };

  userListings: {
    [key: string]: {
      listings: IPaginationListings | null;
      isLoading: boolean;
      error: string | null;
    };
  }

  allListings: {
    listings: IPaginationListings | null;
    isLoading: boolean;
    error: string | null;
  }

  singleListing:{
    listing: IListing | null;
    isLoading: boolean;
    error: string | null;
  };

}

const initialState: ListingsState = {
  myListings: {
    listings: null,
    isLoading: false,
    error: null,
  },
  createListingErrors: [],
  deleteListingErrors: {},
  buyListingErrors: {},

  userListings: {},

  allListings: {
    listings: null,
    isLoading: false,
    error: null,
  },
  singleListing:{
    listing: null,
    isLoading: false,
    error: null,
  },
}

export interface ListingsAction {
  id?: number;
  listings?: IPaginationListings;
  error?: string;
}

export const listingsReducer = createSlice({
  name: "listings",
  initialState,
  reducers: {
    getStart: (state, action: PayloadAction<ListingsAction>): ListingsState => ({
      ...state,
      userListings: {
        ...state.userListings,
        [action.payload.id!]: {
          ...state.userListings[action.payload.id!],
          isLoading: true,
        },
      }
    }),
    getSuccess: (state, action: PayloadAction<ListingsAction>): ListingsState => ({
      ...state,
      userListings: {
        ...state.userListings,
        [action.payload.id!]: {
          ...state.userListings[action.payload.id!],
          listings: action.payload.listings,
          isLoading: false,
          error: null,
        },
      }
    }),
    getFailure: (state, action: PayloadAction<ListingsAction>): ListingsState => ({
      ...state,
      userListings: {
        ...state.userListings,
        [action.payload.id!]: {
          ...state.userListings[action.payload.id!],
          isLoading: false,
          error: action.payload.error,
        },
      }
    }),
    getMyStart: (state): ListingsState => ({
      ...state,
      myListings: {
        ...state.myListings,
        isLoading: true,
      },
    }),
    getMySuccess: (state, action: PayloadAction<ListingsAction>): ListingsState => ({
      ...state,
      myListings: {
        ...state.myListings,
        listings: action.payload.listings!,
        isLoading: false,
        error: null,
      },
    }),
    getMyFailure: (state, action: PayloadAction<ListingsAction>): ListingsState => ({
      ...state,
      myListings: {
        ...state.myListings,
        isLoading: false,
        error: action.payload.error!,
      },
    }),
    createListingFailure: (state, action: PayloadAction<ListingsAction>): ListingsState => ({
      ...state,
      createListingErrors: [
        ...state.createListingErrors,
        action.payload.error!,
      ]
    }),
    getListingStart: (state): ListingsState => ({
      ...state,
      singleListing:{
        ...state.singleListing,
        isLoading:true,
      }
    }),
    getListingSuccess: (state, action: PayloadAction<IListing>): ListingsState => ({
      ...state,
      singleListing: {
        ...state.singleListing,
        listing: action.payload!,
        isLoading: false,
        error: null,
      },
    }),
    getListingFailure: (state, action: PayloadAction<ListingsAction>): ListingsState => ({
      ...state,
      singleListing: {
        ...state.singleListing,
        isLoading: false,
        error: action.payload.error!,
      },
    }),
    buyListingFailure:(state, action: PayloadAction<ListingsAction>):ListingsState => ({
      ...state,
      buyListingErrors: {
        ...state.buyListingErrors,
        [action.payload.id!]:action.payload.error
      },
    }),
    deleteListingFailure:(state, action: PayloadAction<ListingsAction>):ListingsState => ({
      ...state,
      deleteListingErrors: {
        ...state.deleteListingErrors,
        [action.payload.id!]:action.payload.error
      },
    }),
    getUserListingsStart: (state,action: PayloadAction<ListingsAction>): ListingsState => ({
      ...state,
      userListings:{
        ...state.userListings,
        [action.payload.id!]:{
          ...state.userListings[action.payload.id!],
          isLoading:true,
        }
      }
    }),
    getUserListingsSuccess: (state, action: PayloadAction<ListingsAction>): ListingsState => ({
      ...state,
      userListings: {
        ...state.userListings,
        [action.payload.id!]:{
          ...state.userListings[action.payload.id!],
          listing: action.payload.listings!,
          isLoading: false,
          error: null,
        }
      },
    }),
    getUserListingsFailure: (state, action: PayloadAction<ListingsAction>): ListingsState => ({
      ...state,
      userListings: {
        ...state.userListings,
        [action.payload.id!]:{
          ...state.userListings[action.payload.id!],
          isLoading: false,
          error: action.payload.error,
        }
      },
    }),
    searchListingsStart: (state): ListingsState => ({
      ...state,
      allListings:{
        ...state.allListings,
          isLoading:true,
      }
    }),
    searchListingsSuccess: (state, action: PayloadAction<ListingsAction>): ListingsState => ({
      ...state,
      allListings: {
        ...state.allListings,
          listings: action.payload.listings!,
          isLoading: false,
          error: null,
      },
    }),
    searchListingsFailure: (state, action: PayloadAction<ListingsAction>): ListingsState => ({
      ...state,
      allListings: {
        ...state.allListings,
          isLoading: false,
          error: action.payload.error!,
      },
    }),
    // searchListingsMoreStart: (state): ListingsState => ({
    //   ...state,
    //   allListings:{
    //     ...state.allListings,
    //       isLoading:true,
    //   }
    // }),
    // searchListingsMoreSuccess: (state, action: PayloadAction<ListingsAction>): ListingsState => {
    //   const listings = [...(state.allListings.listings??[] ),...action.payload.listings!];
    //   return {...state,
    //   allListings: {
    //     ...state.allListings,
    //       listings,
    //       isLoading: false,
    //       error: null,
    //   },}
    // },
    // searchListingsMoreFailure: (state, action: PayloadAction<ListingsAction>): ListingsState => ({
    //   ...state,
    //   allListings: {
    //     ...state.allListings,
    //       isLoading: false,
    //       error: action.payload.error!,
    //   },
    // }),
  },
});

export const {
  getStart,
  getSuccess,
  getFailure,
  getMyStart,
  getMySuccess,
  getMyFailure,
  createListingFailure,
  getListingStart,
  getListingSuccess,
  getListingFailure,
  buyListingFailure,
  deleteListingFailure,
  getUserListingsStart,
  getUserListingsSuccess,
  getUserListingsFailure,
  searchListingsStart,
  searchListingsSuccess,
  searchListingsFailure,
  // searchListingsMoreStart,
  // searchListingsMoreSuccess,
  // searchListingsMoreFailure
} = listingsReducer.actions;

export default listingsReducer.reducer;
