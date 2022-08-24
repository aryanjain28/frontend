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
import React from "react";
import { en } from "../../constants/labels";
import ExpandedDataGridCell from "../../features/ExpandedDataGridCell";
import { palette } from "../../styles/theme";
import { Column, Row } from "../../types/datagrid.types";
import { Loader } from "../Loader";
import DataGridCell from "./DataGridCell.component";
import DataGridHeadCell from "./DataGridHeadCell.component";

const DataGridTableComponent = ({
  isLoading = false,
  columns,
  data,
  expandedRowId,
}: DataGridTableComponentProps) => {
  return (
    <Box alignItems="center">
      <Box
        sx={{
          border: `${palette.primary.border} 1px solid`,
          borderRadius: "4px",
        }}
      >
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
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length}>
                  <Box
                    width="100%"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Loader />
                  </Box>
                </TableCell>
              </TableRow>
            ) : data.length > 0 ? (
              data.map((row, index) => {
                return (
                  <React.Fragment key={`${row.id}_${index}`}>
                    <TableRow>
                      {columns.map(
                        (col) =>
                          !col.hidden && (
                            <DataGridCell
                              key={col.key}
                              row={row}
                              col={col}
                              index={index}
                            />
                          )
                      )}
                    </TableRow>
                    {
                      <TableRow>
                        <ExpandedDataGridCell
                          row={row}
                          open={expandedRowId === row.id}
                          colSpan={columns.length}
                        />
                      </TableRow>
                    }
                  </React.Fragment>
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
  expandedRowId?: string | null;
}

export default DataGridTableComponent;
