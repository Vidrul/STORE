import { Box, Button, Paper } from "@mui/material";
import { FC, useEffect, useState } from "react";
import {
  useLocation,
  useOutletContext,
  useParams,
  useSearchParams,
  Location,
} from "react-router-dom";
import { ISortedBy, IOutle } from "../../../types/types";
import Card from "../../ui/ProductCard";
import List from "../../common/List";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import _ from "lodash";
import { useAppSelector } from "../../../hooks/redux";
import { IGoods } from "../../../models/IGoods";
import { getGoods } from "../../../store/selectors/goodsSelectors";
import styles from "./goodsPage.module.css";
import { getCurrentCategoryByName } from "../../../store/selectors/categoriesSelector";
import FilterForm from "../../common/Forms/filterForm/FilterForm";
import { useForm, useWatch } from "react-hook-form";

interface IFilter {
  manufacturer: string[];
}

interface ILocationState {
  manufacturer?: string | null;
}

const GoodsPage: FC = () => {
  const location = useLocation();
  const state = location.state as ILocationState;
  const search = location.search;

  const { category } = useParams();
  const goods = useAppSelector(getGoods());
  const { query } = useOutletContext<IOutle>();
  const currentCategory = useAppSelector(
    getCurrentCategoryByName(category || "")
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortedBy, setSortedBy] = useState<ISortedBy>({
    path: "price",
    order: "asc",
  });

  const { control } = useForm<IFilter>({
    defaultValues: {
      manufacturer: state?.manufacturer ? [state.manufacturer] : [],
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const watch = useWatch({ control, name: "manufacturer" });

  useEffect(() => {
    setSearchParams({
      manufacturer: watch,
    });
  }, [watch]);

  const handleOrderBy = () => {
    setSortedBy((prevState: ISortedBy) => ({
      ...prevState,
      order: prevState.order === "asc" ? "desc" : "asc",
    }));
  };

  if (goods) {
    const filterGoods = (items: IGoods[]) => {
      const filteredGoods: Array<IGoods> = [];
      items.forEach((item) => {
        for (const manufacturer of searchParams.getAll("manufacturer")) {
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
          <FilterForm control={control} />
        </Paper>
        <Box sx={{ width: "65%", textAlign: "right", mb: 2 }}>
          <Button onClick={handleOrderBy}>
            {sortedBy.path}
            {sortedBy.order === "asc" ? (
              <ArrowDropDownIcon />
            ) : (
              <ArrowDropUpIcon />
            )}
          </Button>
          <Box sx={{ overflow: "scroll", textAlign: "left", height: "70vh" }}>
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
