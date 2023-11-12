import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserProfile } from "../../api/auth/types";
import { IUsers } from "../../api/admin/types";
import { ICategories } from "../../api/category/types";

export interface CategoryState {
  categoriesData: {
    categories: ICategories | null;
    isLoading: boolean;
    error: string | null;
  };
}

const initialState: CategoryState = {
  categoriesData: {
    categories: null,
    isLoading: false,
    error: null,
  },

}

export const categoryReducer = createSlice({
  name: "category",
  initialState,
  reducers: {
    getCategoriesStart: (state): CategoryState => ({
      ...state,
      categoriesData: {
        ...state.categoriesData,
        isLoading: true,
      },
    }),
    getCategoriesSuccess: (state, action: PayloadAction<ICategories>): CategoryState => ({
      ...state,
      categoriesData: {
        ...state.categoriesData,
        categories: action.payload,
        isLoading: false,
        error: null,
      },
    }),
    getCategoriesFailure: (state, action: PayloadAction<string>): CategoryState => ({
      ...state,
      categoriesData: {
        ...state.categoriesData,
        isLoading: false,
        error: action.payload,
      },
    }),
  }
});

export const {
  getCategoriesStart,
  getCategoriesSuccess,
  getCategoriesFailure
} = categoryReducer.actions;

export default categoryReducer.reducer;
