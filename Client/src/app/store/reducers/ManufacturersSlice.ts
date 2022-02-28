import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IManufacturers } from "../../models/IManufacturers";
import manufacturerService from "../../service/manufacturers.service";
import { isOutDated } from "../../utils/helper/isOutDated";
import { AppDispatch, RootState } from "../store";

interface ManufacturersState {
  entities: IManufacturers[];
  isLoading: boolean;
  error: string;
  lastFetch: number | null;
}

const initialState: ManufacturersState = {
  entities: [],
  isLoading: true,
  lastFetch: null,
  error: "",
};

const categorySlice = createSlice({
  name: "manufacturers",
  initialState,
  reducers: {
    manufacturersRequested: (state) => {
      state.isLoading = true;
    },
    manufacturersReceived: (state, action: PayloadAction<IManufacturers[]>) => {
      state.isLoading = false;
      state.entities = action.payload;
      state.lastFetch = Date.now();
      state.error = "";
    },
    manufacturersRejected: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

const { reducer: manufacturerReducer, actions } = categorySlice;

const { manufacturersRequested, manufacturersReceived, manufacturersRejected } =
  actions;

export const loadManufacturersList =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    const { lastFetch } = getState().manufacturers;
    if (isOutDated(lastFetch || 0)) {
      dispatch(manufacturersRequested);
      try {
        const { content } = await manufacturerService.get();
        dispatch(manufacturersReceived(content));
      } catch (error: any) {
        dispatch(manufacturersRejected(error.message));
      }
    }
  };

export default manufacturerReducer;
