import { RootState } from "../store";

export function getManufacturers() {
  return (state: RootState) => state.manufacturers.entities;
}

export function getCurrentManufaturerById(id: string) {
  return (state: RootState) =>
    state.manufacturers.entities.find((c) => c._id === id);
}
