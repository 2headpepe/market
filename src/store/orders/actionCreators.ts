import { Dispatch } from "@reduxjs/toolkit"
import { OrdersAction, getBuysFailure, getBuysStart, getBuysSuccess, getSellsFailure, getSellsStart, getSellsSuccess } from "./ordersReducer"
import { IListings } from "../../api/listings/types";
import api from "../../api";

export const getMySells = () =>
async (dispatch: Dispatch<any>): Promise<void> => {
  try {
    dispatch(getSellsStart({}));

    const result = (await api.orders.getMySells()).data;

    dispatch(getSellsSuccess({listings:result}))
  } catch (e: any) {
    console.error(e)

    dispatch(getSellsFailure({error:e.message}))
  }
}

export const getMyBuys = () =>
async (dispatch: Dispatch<any>): Promise<void> => {
  try {
    dispatch(getBuysStart({id:-1} as OrdersAction));

    const result = (await api.orders.getMyBuys()).data;

    dispatch(getBuysSuccess({listings:result}))
  } catch (e: any) {
    console.error(e)

    dispatch(getBuysFailure({error:e.message}))
  }
}