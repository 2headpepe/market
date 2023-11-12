import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ImagesState {
  [listingId:string] :{
    images: string[] | null;
    isLoading: boolean;
    error: string | null;
  };
}

const initialState: ImagesState = {
}

export interface ImagesAction{
    listingsId:number[];
    images?:{
      [id:number]:string[];
    }
    error?:string;
}

export const imagesReducer = createSlice({
  name: "images",
  initialState,
  reducers: {
    getListingImagesStart: (state,action:PayloadAction<ImagesAction>): ImagesState=> {
      const newState = {...state};
      for(let id of action.payload.listingsId){
        newState[id] = {...newState[id],isLoading:true};
      }
      return newState;
    },
    getListingImagesSuccess: (state, action: PayloadAction<ImagesAction>): ImagesState=> {
      const newState = {...state};
      for(let id of action.payload.listingsId){
        newState[id] = {...newState[id],images:action.payload.images?action.payload.images[id]:null,
          isLoading: false,
          error: null,
        };
      }
      return newState;
    },
    getListingImagesFailure: (state, action: PayloadAction<ImagesAction>): ImagesState => {
      const newState = {...state};
      for(let id of action.payload.listingsId){
        newState[id] = {...newState[id],isLoading:false,error:action.payload.error!};
      }
      return newState;
    },
    // getMyStart: (state,action:PayloadAction<ImagesAction>): ImagesState=> ({
    //     ...state,
    //     myImages: {
    //       ...state.myImages,
    //       isLoading: true,
    //     },
    //   }),
    //   getMySuccess: (state, action: PayloadAction<ImagesAction>): ImagesState=> ({
    //       ...state,
    //       myImages: {
    //         ...state.myImages,
    //         data:action.payload.Images!,
    //         isLoading: false,
    //         error: null,
    //       },
    //     }),
    //   getMyFailure: (state, action: PayloadAction<ImagesAction>): ImagesState => ({
    //     ...state,
    //     myImages: {
    //       ...state.myImages,
    //       isLoading: false,
    //       error: action.payload.error!,
    //     },
    //   }),
  },
});

export const {
  getListingImagesStart,
  getListingImagesSuccess,
  getListingImagesFailure,
} = imagesReducer.actions;

export default imagesReducer.reducer;
