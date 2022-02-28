import { RootState } from "../store";

export function getBasketItemsList() {
  return (state: RootState) => state.basket.entities;
}

export function getBasketQuntity() {
  return (state: RootState) => state.basket;
}
