import { Dispatch } from "@reduxjs/toolkit"
import { ImagesAction, getListingImagesFailure, getListingImagesStart, getListingImagesSuccess } from "./imagesReducer";
import { IGetListingImagesRequest, IGetListingImagesResponse } from "../../api/images/types";

export const getListingImages = ({listingsId}:IGetListingImagesRequest) =>
async (dispatch: Dispatch<any>): Promise<void> => {
  try {
    dispatch(getListingImagesStart({listingsId} as ImagesAction));

    // const res = await api.auth.getMyListings()
    console.log(listingsId)
    const res:IGetListingImagesResponse = {};
    for(let id of listingsId){
      res[id] = [
        "https://static.nike.com/a/images/t_prod_ss/w_640,c_limit,f_auto/21570299-6494-47c1-b583-93903ec82552/air-jordan-4-red-cement-dh6927-161-release-date.jpg",
        "https://static.nike.com/a/images/t_prod_ss/w_640,c_limit,f_auto/30cec72d-58b3-4019-ba0d-7a4dff598586/air-jordan-4-red-cement-dh6927-161-release-date.jpg",
        "https://static.nike.com/a/images/t_prod_ss/w_640,c_limit,f_auto/998df5d1-95d6-4625-886f-66fbf0a566e1/air-jordan-4-red-cement-dh6927-161-release-date.jpg",
        "https://static.nike.com/a/images/t_prod_sc/w_640,c_limit,f_auto/d85bfff4-e91b-4544-8462-e5bb0e351239/air-jordan-4-red-cement-dh6927-161-release-date.jpg",
        "https://static.nike.com/a/images/t_prod_ss/w_640,c_limit,f_auto/8786356f-6584-49ef-a0d0-4c28744da82b/air-jordan-4-red-cement-dh6927-161-release-date.jpg",
        "https://static.nike.com/a/images/t_prod_ss/w_640,c_limit,f_auto/7f29caac-0e3f-4d6e-a603-35b5d66b468b/air-jordan-4-red-cement-dh6927-161-release-date.jpg",
      ];
    }
    console.log(listingsId)

    dispatch(getListingImagesSuccess({listingsId,images:res}))
  } catch (e: any) {
    console.error(e)

    dispatch(getListingImagesFailure({listingsId,error:e.message}))
  }
}