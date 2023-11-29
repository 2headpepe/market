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
  phone:string
}

export interface IRegisterResponse {
  access_token: string;
}

