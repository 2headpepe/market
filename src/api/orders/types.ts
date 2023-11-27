export type IGetBuysResponse = IPaginationOrders;

export interface IPaginationOrders {
  totalPages: number;
  orderResponseList: IOrderResponse[];
}
export interface IOrderResponse{
  id: number;
  sellerId: number;
  buyerId: number;
  sum: number;
  status: string;
  listingId: number;
  listingTitle: string;
  listingText: string;
  listingCategoryId: number;
  listingPostDate: Date;
  listingSold: boolean;
  listingStatus: string;
}
export type IGetSellsResponse = IGetBuysResponse;

export interface IApprove{
  orderId:number;
}
export type IDisapprove = IApprove;
