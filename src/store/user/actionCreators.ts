import { Dispatch } from "@reduxjs/toolkit";
import { loadProfileFailure, loadProfileStart, loadProfileSuccess, loadUserFailure, loadUserStart, loadUserSuccess } from "./authReducer";

import api from "../../api";
import { IGetUserRequest, IUserProfile } from "../../api/user/types";

export const getProfile = () =>
  async (dispatch: Dispatch<any>): Promise<void> => {
    try {
      dispatch(loadProfileStart())

      let res = await api.user.getProfile()

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

      let res = await api.user.getUser(data);

      dispatch(loadUserSuccess(res.data as IUserProfile))
    } catch (e: any) {
      console.error(e)

      dispatch(loadUserFailure(e.message))
    }
  }

