import { TableCell, TableHead as TableHeadMui, TableRow } from "@mui/material";
import { FC } from "react";
import List from "../List";

interface TableHeaderProps {
  columns: any;
}

const TableHeader: FC<TableHeaderProps> = ({ columns }) => {
  return (
    <TableHeadMui>
      <TableRow>
        <List
          items={Object.keys(columns)}
          renderItem={(column) => (
            <TableCell variant="head">{columns[column].name}</TableCell>
          )}
        />
     
      </TableRow>
    </TableHeadMui>
  );
};

export default TableHeader;
