import { FC } from "react";
import { useAppSelector } from "../../../hooks/redux";
import usePagination from "../../../hooks/usePagination";
import { getGoods } from "../../../store/selectors/goodsSelectors";
import List from "../../common/List";
import GridCard from "../../ui/gridCard/GridCard";
import Paginate from "../../ui/paginate/Paginate";
import styles from "./style.module.css";

const MainPage: FC = () => {
  const goods = useAppSelector(getGoods());
  const pageSize = 5;
  const { onPageChange, itemsCrop, pageCount } = usePagination({
    items: goods,
    pageSize,
  });

  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <List
          items={itemsCrop}
          renderItem={(item) => (
            <GridCard
              image={item.image}
              name={item.name}
              manufacturer={item.manufacturer}
              _id={item._id || ""}
              categoryId={item.category}
              price={item.price}
            />
          )}
        />
      </div>
      {pageCount > 1 ? (
        <Paginate onPageChange={onPageChange} pageCount={pageCount} />
      ) : (
        ""
      )}
    </div>
  );
};

export default MainPage;
