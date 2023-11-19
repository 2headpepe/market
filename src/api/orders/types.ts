export type IGetBuysResponse = IPaginationOrders


export interface IPaginationOrders{
  totalPages:number;
  orderResponseList: {
    id: number,
    sellerId: number,
    buyerId: number,
    listingId: number,
    sum: number,
    status: string,
  }
}

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