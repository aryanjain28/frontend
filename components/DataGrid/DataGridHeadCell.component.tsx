import { TableCell, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Column } from "../../types/datagrid.types";

const DataGridHeadCell = (props: DataGridHeadCellProps) => {
  const { column } = props;
  return (
    <TableCell sx={{ py: 1, px: 1, m: 0, background: "#dadedf" }}>
      <Box sx={{}}>
        <Typography sx={{ color: "#0B1246" }} fontWeight={700} variant="body2">
          {column.headerName}
        </Typography>
      </Box>
    </TableCell>
  );
};

interface DataGridHeadCellProps {
  column: Column;
}

export default DataGridHeadCell;
