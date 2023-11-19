export interface IUserProfile {
  id: number,
  firstname: string,
  lastname: string,
  email: string,
  password: string,
  registrationDate: Date,
  balance: number,
  rating: number
  phoneNumber?:string;
}

export interface IGetUserRequest{
  id:number;
}