//login

export interface IGetListingImagesRequest {
  listingsId: number[];
}

export interface IGetListingImagesResponse {
  [id:number]:string[];
}


