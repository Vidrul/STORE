import {
  TableBody as TableBodyMui,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { get } from "lodash";
import { FC } from "react";
import { IGoods } from "../../../models/IGoods";

interface TableBodyProps {
  items: IGoods[];
  columns: any;
  page: number;
  rowsPerPage: number;
  emptyRows: number;
}

const TableBody: FC<TableBodyProps> = ({
  items,
  columns,
  page,
  rowsPerPage,
  emptyRows,
}) => {
  function renderItem(item: IGoods, column: any) {
    if (columns[column].component) {
      const component = columns[column].component;
      if (typeof component === "function") {
        return component(item);
      } else {
        return component;
      }
    }

    return (
      <Typography>
        {columns[column].name === "Image"
          ? "Image url"
          : get(item, columns[column].path)}
      </Typography>
    );
  }

  return (
    <TableBodyMui>
      {items.map((item) => (
        <TableRow key={item._id}>
          {Object.keys(columns).map((column) => (
            <TableCell key={column}>{renderItem(item, column)}</TableCell>
          ))}
        </TableRow>
      ))}
      {emptyRows > 0 && (
        <TableRow
          style={{
            height: 70 * emptyRows,
          }}
        >
          <TableCell colSpan={7} />
        </TableRow>
      )}
    </TableBodyMui>
  );
};

export default TableBody;
