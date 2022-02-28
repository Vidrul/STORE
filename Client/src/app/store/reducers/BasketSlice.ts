import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBasketCard } from "../../types/types";
import { AppDispatch } from "../store";

interface IBasket {
  entities: IBasketCard[];
  cartTotalAmount: number;
  cartTotalQuantity: number;
}

const initialState: IBasket = {
  entities: [],
  cartTotalAmount: 0,
  cartTotalQuantity: 0,
};

const BasketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addedToBasket: (state, action: PayloadAction<IBasketCard>) => {
      const item = state.entities.find((p) => p._id === action.payload._id);
      if (item) {
        item.amount++;
        item.totalPrice += item.price;
      } else {
        state.entities.push(action.payload);
      }
    },
    
    removed: (state, action: PayloadAction<string>) => {
      state.entities = state.entities.filter((p) => p._id !== action.payload);
    },

    quantityDecreased: (state, action: PayloadAction<string>) => {
      const item = state.entities.find((p) => p._id === action.payload);
      if (item) {
        item.amount--;
        item.totalPrice -= item.price;
      }
    },

    countedQuantity: (state) => {
      const { quantity, cost } = state.entities.reduce(
        (basketTotal, basketItem) => {
          basketTotal.cost += basketItem.totalPrice;
          basketTotal.quantity += basketItem.amount;

          return basketTotal;
        },
        { cost: 0, quantity: 0 }
      );

      state.cartTotalAmount = cost;
      state.cartTotalQuantity = quantity;
    },

    clearedBasket: (state) => {
      state.entities = [];
    },
  },
});

const { actions, reducer: BasketReducer } = BasketSlice;

const {
  addedToBasket,
  removed,
  quantityDecreased,
  countedQuantity,
  clearedBasket,
} = actions;

export function addProductToBasket(payload: IBasketCard) {
  return (dispatch: AppDispatch) => {
    dispatch(addedToBasket(payload));
  };
}

export function removeProductFromBasket(payload: string) {
  return (dispatch: AppDispatch) => {
    dispatch(removed(payload));
  };
}

export function decreaseQuantity(payload: string) {
  return (dispatch: AppDispatch) => {
    dispatch(quantityDecreased(payload));
  };
}

export function getTotalQuantityAndAmount() {
  return (dispatch: AppDispatch) => {
    dispatch(countedQuantity());
  };
}

export function cleareBasket() {
  return (dispatch: AppDispatch) => {
    dispatch(clearedBasket());
  };
}

export default BasketReducer;
