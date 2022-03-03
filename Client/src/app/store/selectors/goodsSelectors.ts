import { RootState } from "../store";

export function getGoods() {
  return (state: RootState) => state.goods.entities;
}

export function getFilteredGoods() {
  return (state: RootState) => state.goods.filteredEntities;
}

export function getLoadingStatus() {
  return (state: RootState) => state.goods.isLoading;
}

export function getCurrentProduct(id: string) {
  return (state: RootState) => {
    return state.goods.entities.find((p) => p._id === id);
  };
}
