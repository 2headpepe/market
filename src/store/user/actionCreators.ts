import { Dispatch } from "@reduxjs/toolkit";
import { loadProfileFailure, loadProfileStart, loadProfileSuccess, loadUserFailure, loadUserStart, loadUserSuccess } from "./authReducer";

import api from "../../api";
import { IGetUserRequest, IPatchUserRequest, IUserProfile } from "../../api/user/types";
import { loginUser } from "../auth/actionCreators";

export const getProfile = () =>
  async (dispatch: Dispatch<any>): Promise<void> => {
    try {
      dispatch(loadProfileStart())

      const res = await api.user.getProfile()

      dispatch(loadProfileSuccess(res.data as IUserProfile))
    } catch (e: any) {
      console.error(e)

      dispatch(loadProfileFailure(e.message))
    }
  }


  export const getUser = (data:IGetUserRequest) =>
  async (dispatch: Dispatch<any>): Promise<void> => {
    try {
      dispatch(loadUserStart())

      const res = await api.user.getUser(data);

      dispatch(loadUserSuccess(res.data as IUserProfile))
    } catch (e: any) {
      console.error(e)

      dispatch(loadUserFailure(e.message))
    }
  }

  export const patchUser = (params:IPatchUserRequest) =>
  async (dispatch: Dispatch<any>): Promise<void> => {
    try {
      // dispatch(loadProfileStart())

      const res = await api.user.patchUser(params)
      dispatch(loginUser({
        email: params.email,
        password: params.password
      }))
      // dispatch(loadProfileSuccess(res.data as IUserProfile))
    } catch (e: any) {
      console.error(e)

      // dispatch(loadProfileFailure(e.message))
    }
  }


  export const deleteUser = () =>
  async (): Promise<void> => {
    try {
      // dispatch(loadUserStart())

      const res = await api.user.deleteUser();

      // dispatch(loadUserSuccess(res.data as IUserProfile))
    } catch (e: any) {
      console.error(e)

      // dispatch(loadUserFailure(e.message))
    }
  }

