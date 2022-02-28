import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import "./style.css"
import { FC } from "react";

interface PaginationProps {
  pageCount: number;
  onPageChange: (event: React.ChangeEvent<unknown>, page: number) => void;
}

const Paginate: FC<PaginationProps> = ({ pageCount, onPageChange }) => {
  return (
    <Stack >
      <Pagination
        count={pageCount}
        onChange={onPageChange}
        color="primary"
        size="large" 
      />
    </Stack>
  );
};

export default Paginate;
