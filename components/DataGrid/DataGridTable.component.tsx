import {
  Box,
  CircularProgress,
  Pagination,
  Stack,
  Table as MUITable,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { en } from "../../constants/labels";
import { Column, Row } from "../../types/datagrid.types";
import DataGridCell from "./DataGridCell.component";
import DataGridHeadCell from "./DataGridHeadCell.component";

const DataGridTableComponent = ({
  isLoading = false,
  columns,
  data,
}: DataGridTableComponentProps) => {
  return (
    <Box alignItems="center">
      <Box
        sx={{
          border: "#ACABB3 1px solid",
          borderRadius: "4px",
        }}
      >
        {isLoading ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CircularProgress color="inherit" sx={{ my: 10 }} />
          </Box>
        ) : (
          <MUITable>
            <TableHead>
              <TableRow>
                {columns.map((col) =>
                  col.hidden ? null : (
                    <DataGridHeadCell key={col.key} column={col} />
                  )
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.length > 0 ? (
                data.map((row) => {
                  return (
                    <TableRow>
                      {columns.map((col) => (
                        <DataGridCell key={col.key} row={row} col={col} />
                      ))}
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length}>
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      p={3}
                    >
                      <Typography color="GrayText" fontWeight={700}>
                        {en.noData}
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </MUITable>
        )}
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
        <Stack spacing={2}>
          <Pagination count={10} size="small" />
        </Stack>
      </Box>
    </Box>
  );
};
interface DataGridTableComponentProps {
  isLoading: boolean;
  columns: Column[];
  data: Row[];
}

export default DataGridTableComponent;
