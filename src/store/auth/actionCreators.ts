import { Dispatch } from "@reduxjs/toolkit";
import { ILoginRequest, ILoginResponse, IRegisterRequest, IUserProfile } from "../../api/auth/types";
import { loadProfileFailure, loadProfileStart, loadProfileSuccess, loginFailure, loginStart, loginSuccess, logoutSuccess, registerFailure, registerStart, registerSuccess } from "./authReducer";

import api from "../../api";
import { useNavigate } from "react-router-dom";
import { AxiosPromise } from "axios";
import { store } from "..";

export const loginUser =
  (data: ILoginRequest) =>
    async (dispatch: Dispatch<any>): Promise<void> => {
      try {
        dispatch(loginStart())

        const res = await api.auth.login(data)
        // const res = {data:{accessToken:"234"}}
        // console.log(res.data['access_token'])
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
        dispatch(registerSuccess(res.data['access_token']));

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

        dispatch(logoutSuccess())

        // history.push('/')
      } catch (e) {
        console.error(e)
      }
    }

export const getProfile = () =>
  async (dispatch: Dispatch<any>): Promise<void> => {
    try {
      dispatch(loadProfileStart())

      const res = await api.auth.getProfile()
      

      dispatch(loadProfileSuccess(res.data as IUserProfile))
    } catch (e: any) {
      console.error(e)

      dispatch(loadProfileFailure(e.message))
    }
  }

// let refreshTokenRequest: AxiosPromise<ILoginResponse> | null = null

export const getAccessToken =
  () =>
    async (dispatch: Dispatch<any>): Promise<string | null> => {
      try {
        const accessToken = store.getState().auth.authData.accessToken

        return accessToken
      } catch (e) {
        console.error(e)

        return null
      }
    }