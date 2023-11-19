import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICategories, ICategory } from "../../api/category/types";

export interface CategoryState {
  categoriesData: {
    categories: ICategories | null;
    isLoading: boolean;
    error: string | null;
  };
  singleCategory: {
    category: ICategory | null;
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
  singleCategory: {
    category: null,
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
    getCategoryStart: (state): CategoryState => ({
      ...state,
      singleCategory: {
        ...state.singleCategory,
        isLoading: true,
      },
    }),
    getCategorySuccess: (state, action: PayloadAction<ICategory>): CategoryState => ({
      ...state,
      singleCategory: {
        ...state.singleCategory,
        category: action.payload,
        isLoading: false,
        error: null,
      },
    }),
    getCategoryFailure: (state, action: PayloadAction<string>): CategoryState => ({
      ...state,
      singleCategory: {
        ...state.singleCategory,
        isLoading: false,
        error: action.payload,
      },
    }),
  }
});

export const {
  getCategoriesStart,
  getCategoriesSuccess,
  getCategoriesFailure,
  getCategoryStart,
  getCategorySuccess,
  getCategoryFailure
} = categoryReducer.actions;

export default categoryReducer.reducer;
