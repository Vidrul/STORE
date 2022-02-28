import React, { FC } from "react";
import { useParams } from "react-router-dom";
import GoodsPage from "../components/page/goodsPage/GoodsPage";
import NotFoundPage from "../components/page/NotFoundPage";
import ProductPage from "../components/page/productPage/ProductPage";

const ProductList: FC = ({ children }) => {
  const { category, id, manufacturer } = useParams();

  return (
    <>
      {id ? (
        <ProductPage />
      ) : category ? (
        <GoodsPage />
      ) : manufacturer ? (
        <GoodsPage />
      ) : (
        <NotFoundPage />
      )}
    </>
  );
};

export default ProductList;
