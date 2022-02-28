import { RootState } from "../store";

export function getCategories() {
  return (state: RootState) => state.categories.entities;
}

export function getCurrentCategoryByName(name: string) {
  return (state: RootState) =>
    state.categories.entities.find((c) => c.name === name);
}

export function getCurrentCategoryById(id: string) {
  return (state: RootState) =>
    state.categories.entities.find((c) => c._id === id);
}
