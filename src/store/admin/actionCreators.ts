import { Dispatch } from "@reduxjs/toolkit";
import { createCategoryFailure, deleteCategoryFailure, deleteDepositFailure, deleteUserFailure, deleteWithdrawFailure, getDepositsFailure, getDepositsStart, getDepositsSuccess, getUsersFailure, getUsersStart, getUsersSuccess, getWithdrawsFailure, getWithdrawsStart, getWithdrawsSuccess } from "./adminReducer";

import api from "../../api";
import { ICreateCategoryRequest, IDeleteCategoryRequest, IDeleteDepositRequest, IDeleteUserRequest, IDeleteWithdrawRequest } from "../../api/admin/types";
import { getCategories } from "../category/actionCreators";

export const getUsers =
  () =>
    async (dispatch: Dispatch<any>): Promise<void> => {
      try {
        dispatch(getUsersStart())

        const res = await api.admin.getUsers();

        dispatch(getUsersSuccess(res.data))

      } catch (e: any) {
        console.error(e)

        dispatch(getUsersFailure(e.message))
      }
    }

export const deleteUser =
  (data: IDeleteUserRequest) =>
    async (dispatch: Dispatch<any>): Promise<void> => {
      try {

        await api.admin.deleteUser(data);

        dispatch(getUsers());

      } catch (e: any) {
        console.error(e)

        dispatch(deleteUserFailure({error:e.message,id:data.id}))
      }
    }

export const createCategory =
  (data: ICreateCategoryRequest) =>
    async (dispatch: Dispatch<any>): Promise<void> => {
      try {

        const res = await api.admin.createCategory(data);
        dispatch(getCategories())

      } catch (e: any) {
        console.error(e)

        dispatch(createCategoryFailure(e.message))
      }
    }

export const deleteCategory =
  (data: IDeleteCategoryRequest) =>
    async (dispatch: Dispatch<any>): Promise<void> => {
      try {
        await api.admin.deleteCategory(data);

        dispatch(getCategories());

      } catch (e: any) {
        console.error(e)

        dispatch(deleteCategoryFailure({error:e.message,id:data.categoryId}))
      }
    }


export const getWithdraws =
  () =>
    async (dispatch: Dispatch<any>): Promise<void> => {
      try {
        dispatch(getWithdrawsStart())

        const res = await api.admin.getWithdraws();

        dispatch(getWithdrawsSuccess(res.data))

      } catch (e: any) {
        console.error(e)

        dispatch(getWithdrawsFailure(e.message))
      }
    }
export const deleteWithdraws =
  (data: IDeleteWithdrawRequest) =>
    async (dispatch: Dispatch<any>): Promise<void> => {
      try {
        await api.admin.deleteWithdraw(data);

        dispatch(getWithdraws());

      } catch (e: any) {
        console.error(e)

        dispatch(deleteWithdrawFailure({error:e.message,id:data.withdrawId}))
      }
    }

export const getDeposits =
  () =>
    async (dispatch: Dispatch<any>): Promise<void> => {
      try {
        dispatch(getDepositsStart())

        const res = await api.admin.getDeposits();

        dispatch(getDepositsSuccess(res.data))

      } catch (e: any) {
        console.error(e)

        dispatch(getDepositsFailure(e.message))
      }
    }


export const deleteDeposit =
  (data: IDeleteDepositRequest) =>
    async (dispatch: Dispatch<any>): Promise<void> => {
      try {
        await api.admin.deleteDeposit(data);

        dispatch(getDeposits());

      } catch (e: any) {
        console.error(e)

        dispatch(deleteDepositFailure({error:e.message,id:data.depositId}))
      }
    }
