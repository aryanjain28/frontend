import { Box, TableCell, Typography } from "@mui/material";
import { Column, Row } from "../../types/datagrid.types";

const DataGridCell = (props: DataGridCellProps) => {
  const { row, col } = props;
  const Component = col.Component;
  const value = row[col.key];
  return (
    <TableCell sx={{ p: 1 }}>
      <Box>
        {Component ? (
          <Component row={row} col={col} />
        ) : (
          <Typography variant="body1">{value}</Typography>
        )}
      </Box>
    </TableCell>
  );
};

interface DataGridCellProps {
  index: number;
  row: Row;
  col: Column;
}

export default DataGridCell;
