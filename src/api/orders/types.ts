export type IGetBuysResponse = IListings;


export type IGetSellsResponse = IGetBuysResponse;
export interface IListing
  {
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