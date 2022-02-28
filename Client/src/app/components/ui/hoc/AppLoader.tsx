import React, { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { loadAuthorizedUserData } from "../../../store/reducers/AuthSlice";
import { loadCategoriesList } from "../../../store/reducers/CategoriesSlice";
import { getGoodsList } from "../../../store/reducers/GoodsSlice";
import { loadManufacturersList } from "../../../store/reducers/ManufacturersSlice";
import { getAuthorizedUserStatus } from "../../../store/selectors/authSelector";
import Loader from "../../common/loaders/Loader";

interface IAppLoader {
  children: any;
}

const AppLoader: FC<IAppLoader> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.goods);
  const userLoginStatus = useAppSelector(getAuthorizedUserStatus());

  useEffect(() => {
    dispatch(loadCategoriesList());
    dispatch(loadManufacturersList());
    dispatch(getGoodsList());
    if (userLoginStatus) dispatch(loadAuthorizedUserData());
  }, [dispatch, userLoginStatus]);

  if (!isLoading) {
    return children;
  }

  return <Loader />;
};

export default AppLoader;
