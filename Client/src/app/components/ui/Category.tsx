import { FC } from "react";
import { useAppSelector } from "../../hooks/redux";

interface CategoryPros {
  categoryId: string;
}

const Category: FC<CategoryPros> = ({ categoryId }) => {
  const { entities } = useAppSelector((state) => state.categories);
  const { isLoading } = useAppSelector((state) => state.categories);
  const currentCategory = entities.find((c) => c._id === categoryId);
  return <div>{isLoading ? "Loading ..." : currentCategory?.name}</div>;
};

export default Category;
