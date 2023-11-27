/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch } from "@reduxjs/toolkit";
import {
  getListingImagesFailure,
  getListingImagesStart,
  getListingImagesSuccess,
} from "./imagesReducer";
import {
  IGetListingsImagesRequest
} from "../../api/images/types";
import api from "../../api";
import { postListingImageApi } from "../../api/images";
import { axiosInstance } from "../../clear_api/instance";

export const getListingImages =
  (params: IGetListingsImagesRequest) =>
  async (dispatch: Dispatch<any>): Promise<void> => {
    try {
      dispatch(getListingImagesStart({ listingsId: params.listingId }));

      const response = params.listingId.map((value: number) => {
        return api.images.getListingImages({ listingId: value });
      });

      const result = await Promise.all(response);
      const json = await result.map((e) => e.data);

      dispatch(
        getListingImagesSuccess({
          listingsId: params.listingId,
          images: json.reduce((a, v) => {
            if(!v?.length){
              return a;
            }
            return { ...a, [v[0].listingId]: v   };
          }, {}),
        })
      );

      // const res:IGetListingImagesResponse = {};
      // for(let id of listingsId){
      //   res[id] = [
      //     "https://static.nike.com/a/images/t_prod_ss/w_640,c_limit,f_auto/21570299-6494-47c1-b583-93903ec82552/air-jordan-4-red-cement-dh6927-161-release-date.jpg",
      //     "https://static.nike.com/a/images/t_prod_ss/w_640,c_limit,f_auto/30cec72d-58b3-4019-ba0d-7a4dff598586/air-jordan-4-red-cement-dh6927-161-release-date.jpg",
      //     "https://static.nike.com/a/images/t_prod_ss/w_640,c_limit,f_auto/998df5d1-95d6-4625-886f-66fbf0a566e1/air-jordan-4-red-cement-dh6927-161-release-date.jpg",
      //     "https://static.nike.com/a/images/t_prod_sc/w_640,c_limit,f_auto/d85bfff4-e91b-4544-8462-e5bb0e351239/air-jordan-4-red-cement-dh6927-161-release-date.jpg",
      //     "https://static.nike.com/a/images/t_prod_ss/w_640,c_limit,f_auto/8786356f-6584-49ef-a0d0-4c28744da82b/air-jordan-4-red-cement-dh6927-161-release-date.jpg",
      //     "https://static.nike.com/a/images/t_prod_ss/w_640,c_limit,f_auto/7f29caac-0e3f-4d6e-a603-35b5d66b468b/air-jordan-4-red-cement-dh6927-161-release-date.jpg",
      //   ];
      // }
      // console.log(listingsId)

      // dispatch(getListingImagesSuccess({ listingsId, images: [] }));
    } catch (e: any) {
      console.error(e);

      dispatch(getListingImagesFailure({ listingsId:params.listingId, error: e.message }));
    }
  };


export const postListingImage =  (params: {listingId:number,images:File[]}) =>
async (): Promise<void> => {
  try {
    console.log('params',params);
    const responses = params.images.map((photo: File) => {
      console.log("start");
      console.log(photo);
      const formData = new FormData();
      formData.append("file", photo);
      formData.append("upload_preset", "ml_default");
      formData.append("api_key", "266274934912378");

      const res = axiosInstance.post(
        "https://api.cloudinary.com/v1_1/dmgz7ezzp/image/upload",formData
      );
      return res;
    });
    console.log(responses);
    const result = await Promise.all(responses);
    const json = result.map((e)=> e.data);
    const secure_urls = json.map((e)=>e['secure_url']);

    console.log(json,secure_urls);
    secure_urls.forEach(async (e)=> {
      await postListingImageApi({listingId:params.listingId,path:e});
    })
    // dispatch(postListingImage({listingId:params.listingId,images:}));
  } catch (e: any) {
    console.error(e);

    // dispatch(getListingImagesFailure({ listingsId:params.listingId, error: e.message }));
  }
};
