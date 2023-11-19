import { Dispatch } from "@reduxjs/toolkit"
import { OrdersAction, getActiveBuysFailure, getActiveBuysStart, getActiveBuysSuccess, getActiveSellsFailure, getActiveSellsStart, getActiveSellsSuccess, getApprovedBuysFailure, getApprovedBuysStart, getApprovedBuysSuccess, getApprovedSellsFailure, getApprovedSellsStart, getApprovedSellsSuccess, getDisapprovedBuysFailure, getDisapprovedBuysStart, getDisapprovedBuysSuccess, getDisapprovedSellsFailure, getDisapprovedSellsStart, getDisapprovedSellsSuccess } from "./ordersReducer"
import api from "../../api";

export const getDisapprovedSells = () =>
async (dispatch: Dispatch<any>): Promise<void> => {
  try {
    dispatch(getDisapprovedSellsStart({}));

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
    dispatch(getDisapprovedBuysStart({id:-1} as OrdersAction));

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
    dispatch(getApprovedSellsStart({}));

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
    dispatch(getApprovedBuysStart({id:-1} as OrdersAction));

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
    dispatch(getActiveSellsStart({}));

    const result = (await api.orders.getApprovedSells()).data;

    dispatch(getActiveSellsSuccess({listings:result}))
  } catch (e: any) {
    console.error(e)

    dispatch(getActiveSellsFailure({error:e.message}))
  }
}

export const getActiveBuys = () =>
async (dispatch: Dispatch<any>): Promise<void> => {
  try {
    dispatch(getActiveBuysStart({id:-1} as OrdersAction));

    const result = (await api.orders.getApprovedBuys()).data;

    dispatch(getActiveBuysSuccess({listings:result}))
  } catch (e: any) {
    console.error(e)

    dispatch(getActiveBuysFailure({error:e.message}))
  }
}