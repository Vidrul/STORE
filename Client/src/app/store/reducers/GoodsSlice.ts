import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IGoods } from "../../models/IGoods";
import goodsService from "../../service/goods.service";
import { IFilterData } from "../../types/types";
import { isOutDated } from "../../utils/helper/isOutDated";
import { AppDispatch, RootState } from "../store";

interface GoodsInitialState {
  entities: IGoods[];
  filteredEntities: IGoods[];
  isLoading: boolean;
  error: string;
  lastFetch: number | null;
}

const initialState: GoodsInitialState = {
  entities: [],
  filteredEntities: [],
  isLoading: true,
  error: "",
  lastFetch: null,
};

const goodsSlice = createSlice({
  name: "goods",
  initialState,
  reducers: {
    goodsRequested: (state) => {
      state.isLoading = true;
    },
    goodsReceived: (state, action: PayloadAction<IGoods[]>) => {
      state.isLoading = false;
      state.entities = action.payload;
      state.filteredEntities = action.payload;
      state.lastFetch = Date.now();
      state.error = "";
    },
    goodsRejected: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    productAdded: (state, action: PayloadAction<IGoods>) => {
      state.entities.push(action.payload);
      state.isLoading = false;
    },
    productUpdatedSuccess: (state, action: PayloadAction<IGoods>) => {
      const index = state.entities.findIndex(
        (item) => item._id === action.payload._id
      );
      state.entities[index] = action.payload;
    },

    productRemovedSuccess: (state, action: PayloadAction<string>) => {
      state.entities = state.entities.filter(
        (item) => item._id !== action.payload
      );
    },

    productsFiltered: (state, action: PayloadAction<IFilterData>) => {
      const initialEntities = state.entities;
      const maxPrice = action.payload.maxPrice
        ? Number(action.payload.maxPrice)
        : 9999;
      state.filteredEntities = initialEntities.filter(
        (item) =>
          item.price >= Number(action.payload.minPrice) &&
          item.price <= maxPrice
      );
    },
  },
});

const { actions, reducer: goodsReducer } = goodsSlice;

const {
  goodsReceived,
  goodsRejected,
  goodsRequested,
  productAdded,
  productUpdatedSuccess,
  productRemovedSuccess,
  productsFiltered,
} = actions;

const productUpdateRequested = createAction("goods/productUpdateRequested");
const productRemoveRequested = createAction("goods/productRemoveRequested");
const productCreateRequested = createAction("goods/productCreateRequested");

export const getGoodsList =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(goodsRequested());
    try {
      const { content } = await goodsService.get();

      setTimeout(() => {
        dispatch(goodsReceived(content));
      }, 1000);
    } catch (error: any) {
      dispatch(goodsRejected(error.message));
    }
  };

export const updateProduct =
  (payload: IGoods, cb: () => void) => async (dispatch: AppDispatch) => {
    dispatch(productUpdateRequested());
    try {
      const { content } = await goodsService.update(payload);
      dispatch(productUpdatedSuccess(content));
      cb();
    } catch (error: any) {
      dispatch(goodsRejected(error.message));
    }
  };

export const productRemove =
  (id: string, navigate: () => void) => async (dispatch: AppDispatch) => {
    dispatch(productRemoveRequested());
    try {
      await goodsService.remove(id);
      dispatch(productRemovedSuccess(id));
      navigate();
    } catch (error: any) {
      dispatch(goodsRejected(error.message));
    }
  };

export const createNewProduct =
  (payload: IGoods) => async (dispatch: AppDispatch) => {
    dispatch(productCreateRequested());
    try {
      const { content } = await goodsService.create(payload);
      dispatch(productAdded(content));
    } catch (error: any) {
      dispatch(goodsRejected(error.message));
    }
  };

export function filterGoods(payload: IFilterData) {
  return (dispatch: AppDispatch) => {
    dispatch(productsFiltered(payload));
  };
}
export default goodsReducer;
