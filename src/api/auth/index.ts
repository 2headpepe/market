import { AxiosPromise } from "axios";
import Endpoints from "../endpoints";
import { axiosInstance } from "../instance";
import { ILoginRequest, ILoginResponse, IRegisterRequest, IRegisterResponse, IUserProfile } from "./types";

export const login = (params: ILoginRequest): AxiosPromise<ILoginResponse> => axiosInstance.post(Endpoints.AUTH.LOGIN, params);

export const register = (params: IRegisterRequest): AxiosPromise<IRegisterResponse> =>axiosInstance.post(Endpoints.AUTH.REGISTER, params);

export const getProfile = (): AxiosPromise<IUserProfile> => axiosInstance.get(Endpoints.AUTH.PROFILE)
