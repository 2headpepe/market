export type IUsers = IUsersResponse;
export type IUsersResponse = IUser[];
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


export type IGetWithdrawsResponse = IWithdraw[];

export interface IWithdraw{
  id: number,
  userId: number,
  sum: number
}


export type IGetDepositsResponse = IDeposit[];

export type IDeposit = IWithdraw;

export interface IDeleteDepositRequest{
  depositId:number;
  approved:boolean;
}