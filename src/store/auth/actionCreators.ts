import { Dispatch } from "@reduxjs/toolkit";
import { ILoginRequest,IRegisterRequest} from "../../api/auth/types";
import {loginFailure, loginStart, loginSuccess, logoutSuccess, registerFailure, registerStart, registerSuccess } from "./authReducer";

import api from "../../api";
import { store } from "..";

export const loginUser =
  (data: ILoginRequest) =>
    async (dispatch: Dispatch<any>): Promise<void> => {
      try {
        dispatch(loginStart())

        const res = await api.auth.login(data)
        // const res = {data:{accessToken:"234"}}
        // console.log(res.data['access_token'])

        localStorage.setItem('token',res.data['access_token']);

        dispatch(loginSuccess({access_token:res.data['access_token'],role:res.data.role}))

        // dispatch(getProfile())

      } catch (e: any) {
        console.error(e)
        dispatch(loginFailure(e.message))
      }
    }

export const registerUser =
  (data: IRegisterRequest) =>
    async (dispatch: Dispatch<any>): Promise<void> => {
      try {
        dispatch(registerStart())

        const res = await api.auth.register(data)
        // const res = {data:{accessToken:"234"}}
        // console.log(res.data['access_token'])
        dispatch(registerSuccess());

        // const loginData = {email:data.email,password:data.password};

        // dispatch(getProfile())

      } catch (e: any) {
        console.error(e)

        dispatch(registerFailure(e.message))
      }
    }



export const logoutUser =
  () =>
    async (dispatch: Dispatch): Promise<void> => {
      try {
        // await api.auth.logout()

        localStorage.removeItem('token');

        dispatch(logoutSuccess())

        // history.push('/')
      } catch (e) {
        console.error(e)
      }
    }


// let refreshTokenRequest: AxiosPromise<ILoginResponse> | null = null

export const getAccessToken =
  () =>
    async (dispatch: Dispatch<any>): Promise<string | null> => {
      try {
        const accessToken = localStorage.getItem('token');
        if(accessToken){
          return accessToken;
        }

        return store.getState().auth.authData.accessToken
      } catch (e) {
        console.error(e)

        return null
      }
    }