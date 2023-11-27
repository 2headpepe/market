//login

export interface IGetListingImagesRequest {
  listingId: number;
}

export interface IGetListingsImagesRequest {
  listingId: number[];
}

export type IGetListingImagesResponse = IPostListingImageResponse[];

export type IPostListingImageRequest = {
  listingId: number;
  path: string;
};

export interface IPostListingImageResponse {
  id: number;
  listingId: number;
  path: string;
}
export interface IDeleteImageRequest {
  imageId: number;
}
