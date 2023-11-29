import { Dispatch } from "@reduxjs/toolkit";

import api from "../../api";
import { getCategoriesFailure, getCategoriesStart, getCategoriesSuccess, getCategoryFailure, getCategoryStart, getCategorySuccess } from "./categoryReducer";
import { IGetCategoryRequest } from "../../api/category/types";

export const getCategories =
  () =>
    async (dispatch: Dispatch<any>): Promise<void> => {
      try {
        dispatch(getCategoriesStart())

        const res = await api.category.getCategories();

        dispatch(getCategoriesSuccess(res.data))
      } catch (e: any) {
        console.error(e)

        dispatch(getCategoriesFailure(e.message))
      }
    }

    export const getCategory =
  (data:IGetCategoryRequest) =>
    async (dispatch: Dispatch<any>): Promise<void> => {
      try {
        dispatch(getCategoryStart())

        const res = await api.category.getCategory(data);

        dispatch(getCategorySuccess(res.data))
      } catch (e: any) {
        console.error(e)

        dispatch(getCategoryFailure(e.message))
      }
    }