export type IGetListingsResponse = IListings;
export interface IListing {
  id: number,
  title: string,
  text: string,
  categoryId: string,
  price: 0,
  city: string,
  postDate: string,
  sold: boolean,
  userId: number
};
export type IListings = IListing[];


export interface ICreateListingRequest{
  title: string;
  text: string;
  categoryId : number;
  price: number;
}
export type ICreateListingResponse = IListing[];

export interface IGetListingRequest{
  id:number;
}
export type IGetListingResponse = IListing;
export type IBuyListingRequest = IGetListingRequest;
export type IBuyListingRespose = IListing;
export type IDeleteListingRequest = IBuyListingRequest;
export type IGetUserListingsRequest = IGetListingRequest;

export interface ISearchListingsRequest{
  categoryId?:number;
  priceOrder?:boolean;
  postDateOrder:boolean;
}
