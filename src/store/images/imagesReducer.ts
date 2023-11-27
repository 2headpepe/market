import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ImagesState {
  [listingId:string] :{
    images: {
      path:string;
      id:number;
      listingId:number;
    }[]| null;
    isLoading: boolean;
    error: string | null;
  };
}

const initialState: ImagesState = {
}

export interface ImagesAction{
    listingsId:number[];
    images?:{
      [id:number]:{
        path:string;
        id:number;
        listingId:number;
      }[];
    }
    error?:string;
}

export const imagesReducer = createSlice({
  name: "images",
  initialState,
  reducers: {
    getListingImagesStart: (state,action:PayloadAction<ImagesAction>): ImagesState=> {
      const newState = {...state};
      for(const id of action.payload.listingsId){
        newState[id] = {...newState[id],isLoading:true};
      }
      return newState;
    },
    getListingImagesSuccess: (state, action: PayloadAction<ImagesAction>): ImagesState=> {
      const newState = {...state};
      for(const id of action.payload.listingsId){
        newState[id] = {...newState[id],images:action.payload.images?action.payload.images[id]:null,
          isLoading: false,
          error: null,
        };
      }
      return newState;
    },
    getListingImagesFailure: (state, action: PayloadAction<ImagesAction>): ImagesState => {
      const newState = {...state};
      for(const id of action.payload.listingsId){
        newState[id] = {...newState[id],isLoading:false,error:action.payload.error!};
      }
      return newState;
    },
  },
});

export const {
  getListingImagesStart,
  getListingImagesSuccess,
  getListingImagesFailure,
} = imagesReducer.actions;

export default imagesReducer.reducer;
