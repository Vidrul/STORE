import { useState } from "react";
import { IGoods } from "../models/IGoods";
import { paginate } from "../utils/helper/pagination";

interface usePaginationProps {
  items: IGoods[];
  pageSize: number;
}

const usePagination = ({ items, pageSize }: usePaginationProps) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const onPageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const itemsCrop = paginate(items, currentPage, pageSize);
  const pageCount = Math.ceil(items.length / pageSize);

  return { onPageChange, itemsCrop, pageCount };
};

export default usePagination;
