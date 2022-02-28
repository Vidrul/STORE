import { FC } from "react";
import { useAppSelector } from "../../hooks/redux";

interface ManufacturerProps {
  manufacturerId: string;
}

const Manufacturer: FC<ManufacturerProps> = ({ manufacturerId }) => {
  const { entities } = useAppSelector((state) => state.manufacturers);
  const { isLoading } = useAppSelector((state) => state.manufacturers);
  const currentManufacturer = entities.find((m) => m._id === manufacturerId);
  return <div>{isLoading ? "Loading ..." : currentManufacturer?.name}</div>;
};

export default Manufacturer;
