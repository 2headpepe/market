export interface ILoginRequest {
  email: string;
  password: string;
}

export interface ILoginResponse {
  access_token: string;
  role:"ADMIN"|"USER";
}

export interface IRegisterRequest {
  firstname: string,
  lastname: string,
  email: string,
  password: string
}

export interface IRegisterResponse {
  access_token: string;
}

export interface IUserProfile {
  id: number,
  firstname: string,
  lastname: string,
  email: string,
  password: string,
  registrationDate: Date,
  balance: number,
  rating: number
}

