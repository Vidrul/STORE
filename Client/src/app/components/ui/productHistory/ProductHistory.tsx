import { FC } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../hooks/redux";
import { getCurrentCategoryById } from "../../../store/selectors/categoriesSelector";
import { getCurrentManufaturerById } from "../../../store/selectors/manufacturersSelector";
import styles from "./productHistory.module.css";

interface ProductHistoryProps {
  manufacturerId: string;
  categoryId: string;
}

const ProductHistory: FC<ProductHistoryProps> = ({
  manufacturerId,
  categoryId,
}) => {
  const currentCategory = useAppSelector(getCurrentCategoryById(categoryId));
  const currentManufacturer = useAppSelector(
    getCurrentManufaturerById(manufacturerId)
  );

  return (
    <ul className={styles.list}>
      <li>
        <Link to={`/`}>main</Link>
      </li>
      <li>
        <Link to={`/${currentCategory?.name}`} replace>
          {currentCategory?.name}
        </Link>
      </li>
      <li>
        <Link
          to={`/${currentCategory?.name}`}
          state={{ manufacturer: currentManufacturer?._id }}
        >
          {currentManufacturer?.name.toLocaleLowerCase()}
        </Link>
      </li>
    </ul>
  );
};

export default ProductHistory;
