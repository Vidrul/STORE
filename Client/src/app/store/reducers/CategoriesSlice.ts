import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICategories } from "../../models/ICategories";
import categoryService from "../../service/category.service";
import { isOutDated } from "../../utils/helper/isOutDated";
import { AppDispatch, RootState } from "../store";

interface CategoriesState {
  entities: ICategories[];
  isLoading: boolean;
  error: string;
  lastFetch: null | number;
}

const initialState: CategoriesState = {
  entities: [],
  isLoading: true,
  lastFetch: null,
  error: "",
};

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    categoriesRequested: (state) => {
      state.isLoading = true;
    },
    categoriesReceived: (state, action: PayloadAction<ICategories[]>) => {
      state.isLoading = false;
      state.entities = action.payload;
      state.lastFetch = Date.now();
      state.error = "";
    },
    categoriesRejected: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

const { reducer: categoryReducer, actions } = categorySlice;

const { categoriesRequested, categoriesReceived, categoriesRejected } = actions;

export const loadCategoriesList =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    const { lastFetch } = getState().categories;

    if (isOutDated(lastFetch || 0)) {
      dispatch(categoriesRequested);
      try {
        const { content } = await categoryService.get();
        dispatch(categoriesReceived(content));
      } catch (error: any) {
        dispatch(categoriesRejected(error.message));
      }
    }
  };

export default categoryReducer;
