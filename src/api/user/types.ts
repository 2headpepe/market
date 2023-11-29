export interface IUserProfile {
  id: number,
  firstname: string,
  lastname: string,
  email: string,
  password: string,
  registrationDate: Date,
  balance: number,
  rating: number
  phone:string;
  image:string
}

export interface IGetUserRequest{
  id:number;
}

export interface IPatchUserRequest{
  firstname: string,
  lastname: string,
  email: string,
  password: string,
  phone:string,
  image?:string
}