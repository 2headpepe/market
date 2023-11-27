/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch } from "@reduxjs/toolkit"
import { approveSuccess, disapproveSuccess, getActiveBuysFailure, getActiveBuysStart, getActiveBuysSuccess, getActiveSellsFailure, getActiveSellsStart, getActiveSellsSuccess, getApprovedBuysFailure, getApprovedBuysStart, getApprovedBuysSuccess, getApprovedSellsFailure, getApprovedSellsStart, getApprovedSellsSuccess, getDisapprovedBuysFailure, getDisapprovedBuysStart, getDisapprovedBuysSuccess, getDisapprovedSellsFailure, getDisapprovedSellsStart, getDisapprovedSellsSuccess } from "./ordersReducer"
import api from "../../api";
import { IApprove, IDisapprove } from "../../api/orders/types";


export const disapprove = (data:IDisapprove) =>
async (dispatch: Dispatch<any>): Promise<void> => {
  try {

    const res = (await api.orders.disapprove(data)).data;
    dispatch(disapproveSuccess(res))
  } catch (e: any) {
    console.error(e)

  }
}
export const approve = (data:IApprove) =>
async (dispatch: Dispatch<any>): Promise<void> => {
  try {

    const res = (await api.orders.approve(data)).data;
    dispatch(approveSuccess(res))

  } catch (e: any) {
    console.error(e)

  }
}

export const getDisapprovedSells = () =>
async (dispatch: Dispatch<any>): Promise<void> => {
  try {
    dispatch(getDisapprovedSellsStart());

    const result = (await api.orders.getDisapprovedSells()).data;

    dispatch(getDisapprovedSellsSuccess({listings:result}))
  } catch (e: any) {
    console.error(e)

    dispatch(getDisapprovedSellsFailure({error:e.message}))
  }
}

export const getDisapprovedBuys = () =>
async (dispatch: Dispatch<any>): Promise<void> => {
  try {
    dispatch(getDisapprovedBuysStart());

    const result = (await api.orders.getDisapprovedBuys()).data;

    dispatch(getDisapprovedBuysSuccess({listings:result}))
  } catch (e: any) {
    console.error(e)

    dispatch(getDisapprovedBuysFailure({error:e.message}))
  }
}

export const getApprovedSells = () =>
async (dispatch: Dispatch<any>): Promise<void> => {
  try {
    dispatch(getApprovedSellsStart());

    const result = (await api.orders.getApprovedSells()).data;

    dispatch(getApprovedSellsSuccess({listings:result}))
  } catch (e: any) {
    console.error(e)

    dispatch(getApprovedSellsFailure({error:e.message}))
  }
}

export const getApprovedBuys = () =>
async (dispatch: Dispatch<any>): Promise<void> => {
  try {
    dispatch(getApprovedBuysStart());

    const result = (await api.orders.getApprovedBuys()).data;

    dispatch(getApprovedBuysSuccess({listings:result}))
  } catch (e: any) {
    console.error(e)

    dispatch(getApprovedBuysFailure({error:e.message}))
  }
}

export const getActiveSells = () =>
async (dispatch: Dispatch<any>): Promise<void> => {
  try {
    dispatch(getActiveSellsStart());

    const result = (await api.orders.getActiveSells()).data;

    dispatch(getActiveSellsSuccess({listings:result}))
  } catch (e: any) {
    console.error(e)

    dispatch(getActiveSellsFailure({error:e.message}))
  }
}

export const getActiveBuys = () =>
async (dispatch: Dispatch<any>): Promise<void> => {
  try {
    dispatch(getActiveBuysStart());

    const result = (await api.orders.getActiveBuys()).data;

    dispatch(getActiveBuysSuccess({listings:result}))
  } catch (e: any) {
    console.error(e)

    dispatch(getActiveBuysFailure({error:e.message}))
  }
}