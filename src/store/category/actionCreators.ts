import { Dispatch } from "@reduxjs/toolkit";

import api from "../../api";
import { getCategoriesFailure, getCategoriesStart, getCategoriesSuccess } from "./categoryReducer";

export const getCategories =
  () =>
    async (dispatch: Dispatch<any>): Promise<void> => {
      try {
        dispatch(getCategoriesStart())
        console.log(1);

        const res = await api.category.getCategories();

        dispatch(getCategoriesSuccess(res.data))
      } catch (e: any) {
        console.error(e)

        dispatch(getCategoriesFailure(e.message))
      }
    }