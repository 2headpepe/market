import { AxiosPromise } from "axios";
import Endpoints from "../endpoints";
import { axiosInstance } from "../instance";
import { ILoginRequest, ILoginResponse, IRegisterRequest, IRegisterResponse } from "./types";

export const login = (params: ILoginRequest): AxiosPromise<ILoginResponse> => axiosInstance.post(Endpoints.AUTH.LOGIN, params);

export const register = (params: IRegisterRequest): AxiosPromise<IRegisterResponse> =>axiosInstance.post(Endpoints.AUTH.REGISTER, params);

