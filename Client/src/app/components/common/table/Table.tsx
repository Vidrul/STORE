import {
  TableContainer,
  Table as TableMui,
  Paper,
  TablePagination,
} from "@mui/material";
import { FC, useState } from "react";
import { IGoods } from "../../../models/IGoods";
import TableBody from "./TableBody";
import TableHeader from "./TableHeader";
import styles from "./table.module.css";

interface TableProps {
  items: IGoods[];
  columns: any;
}

const Table: FC<TableProps> = ({ items, columns }) => {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const cropItems = items.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - items.length) : 0;

  return (
    <TableContainer className={styles.table} component={Paper}>
      <TableMui size="medium" aria-label="simple table">
        <TableHeader columns={columns} />
        <TableBody
          emptyRows={emptyRows}
          items={cropItems}
          columns={columns}
          page={page}
          rowsPerPage={rowsPerPage}
        />
      </TableMui>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={items.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

export default Table;
