import { Box, Button, Paper } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useLocation, useOutletContext, useParams } from "react-router-dom";
import { ISortedBy, IOutle, IFilterData } from "../../../types/types";
import Card from "../../ui/ProductCard";
import List from "../../common/List";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import _ from "lodash";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { IGoods } from "../../../models/IGoods";
import { getFilteredGoods } from "../../../store/selectors/goodsSelectors";
import styles from "./goodsPage.module.css";
import { getCurrentCategoryByName } from "../../../store/selectors/categoriesSelector";
import FilterForm from "../../common/Forms/filterForm/FilterForm";
import { useForm } from "react-hook-form";
import { filterGoods } from "../../../store/reducers/GoodsSlice";

interface IFilter {
  manufacturer: string[];
  maxPrice: number;
  minPrice: number;
}

interface ILocationState {
  manufacturer?: string | null;
}

const GoodsPage: FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const state = location.state as ILocationState;

  const { category } = useParams();
  const goods = useAppSelector(getFilteredGoods());
  const { query } = useOutletContext<IOutle>();
  const currentCategory = useAppSelector(
    getCurrentCategoryByName(category || "")
  );

  const [sortedBy, setSortedBy] = useState<ISortedBy>({
    path: "price",
    order: "asc",
  });

  const { control, watch, handleSubmit } = useForm<IFilter>({
    defaultValues: {
      manufacturer: state?.manufacturer ? [state.manufacturer] : [],
      maxPrice: 0,
      minPrice: 0,
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const manufacturers = watch("manufacturer");

  const onSubmit = (data: IFilterData) => {
    dispatch(filterGoods(data));
  };

  const handleOrderBy = () => {
    setSortedBy((prevState: ISortedBy) => ({
      ...prevState,
      order: prevState.order === "asc" ? "desc" : "asc",
    }));
  };

  useEffect(() => {
    
  }, [])

  if (goods) {
    const filterGoods = (items: IGoods[]) => {
      const filteredGoods: Array<IGoods> = [];
      items.forEach((item) => {
        for (const manufacturer of manufacturers) {
          if (item.manufacturer === manufacturer) filteredGoods.push(item);
        }
      });

      return filteredGoods.length > 0 ? filteredGoods : items;
    };

    const filterByQuery = goods.filter(
      (item) =>
        item.name.toLocaleLowerCase().includes(query.toLocaleLowerCase()) &&
        item.category === currentCategory?._id
    );

    const sortedGoods = _.orderBy(
      filterGoods(filterByQuery),
      [sortedBy.path],
      [sortedBy.order]
    );

    return (
      <Box className={styles.wrapper}>
        <Paper className={styles.filter}>
          <FilterForm control={control} onSubmit={handleSubmit(onSubmit)} />
        </Paper>
        <Box className={styles.main}>
          <Button onClick={handleOrderBy}>
            {sortedBy.path}
            {sortedBy.order === "asc" ? (
              <ArrowDropDownIcon />
            ) : (
              <ArrowDropUpIcon />
            )}
          </Button>
          <Box className={styles.main__content}>
            {sortedGoods.length ? (
              <List
                items={sortedGoods}
                renderItem={(good: IGoods) => (
                  <Card
                    key={good._id}
                    id={good._id!}
                    amount={good.amount}
                    manufacturer={good.manufacturer}
                    image={good.image}
                    name={good.name}
                    price={good.price}
                  />
                )}
              />
            ) : (
              <h2>{"We have no products(("}</h2>
            )}
          </Box>
        </Box>
      </Box>
    );
  }
  return <>{"Loading ..."}</>;
};

export default GoodsPage;
