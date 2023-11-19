export type IUsers = IPaginationUsersResponse;
export type IPaginationUsersResponse = {
  totalPages:number;
  userResponseList:IUser[];
}
export interface IUser{
  id: number,
  firstname: string,
  lastname: string,
  email: string,
  password: string,
  registrationDate: string,
  balance: number,
  rating: number,
  role:'ADMIN'|'USER'
}

export interface ICreateCategoryRequest{
  name:string;
}

export interface IDeleteCategoryRequest{
  categoryId:number;
}


export interface IDeleteUserRequest{
  id:number;
}

export interface IDeleteWithdrawRequest{
  withdrawId:number;
  approved:boolean;
}


export type IGetWithdrawsResponse ={
  totalPages:number;
  withdrawResponseList:IWithdraw[];
}

export interface IWithdraw{
  id: number,
  userId: number,
  sum: number
}


export type IGetDepositsResponse = {
  totalPages:number;
  depositResponseList:IDeposit[];
}

export type IDeposit = IWithdraw;

export interface IDeleteDepositRequest{
  depositId:number;
  approved:boolean;
}