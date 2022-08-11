import { Add, Search } from "@mui/icons-material";
import {
  Box,
  CircularProgress,
  Grid,
  Input,
  Pagination,
  Popover,
  Stack,
  Table as MUITable,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { en } from "../../constants/labels";
import DateRangePopover from "../../features/DateRangePopover";
import { FormInput } from "../../features/FormInput";
import { Column, Row } from "../../types/datagrid.types";
import { Button } from "../Button";
import SelectComponent from "../Select";

const DataGridHeadCell = (props: DataGridHeadCellProps) => {
  const { column } = props;
  return (
    <TableCell sx={{ p: 1, m: 0, background: "#FAFAFA" }}>
      <Box sx={{}}>
        <Typography sx={{ color: "#0B1246" }} fontWeight={700} variant="body2">
          {column.headerName}
        </Typography>
      </Box>
    </TableCell>
  );
};

const DataGridCell = (props: DataGridCellProps) => {
  const { row, col } = props;
  const Component = col.Component;
  const value = row[col.key];
  return (
    <TableCell sx={{ p: 1, m: 0, alignItems: "center" }}>
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

export const DataGridComponent = (props: DataGridComponentProps) => {
  const {
    showSearch = true,
    showFilters = true,
    data,
    columns,
    query,
    setQuery,
    isLoading,
    placeholder,
  } = props;
  const [popoverOpen, setPopoverOpen] = useState(null);
  return (
    <Box alignItems="center" sx={{ mx: 3 }}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="start"
        gap={2}
        my={2}
      >
        {showSearch && (
          <FormInput
            label={placeholder || en.searchTable}
            value={query || ""}
            handleOnChange={(value) => setQuery!(value as string)}
          />
        )}
        {showFilters && (
          <>
            <Button
              label="Add Filters"
              icon={<Add />}
              onClick={(e) => setPopoverOpen(e.currentTarget)}
            />
            <Popover
              open={Boolean(popoverOpen)}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              onClose={() => setPopoverOpen(null)}
              anchorEl={popoverOpen}
            >
              <Box width="500px">
                <Grid
                  container
                  direction="column"
                  justifyContent="centre"
                  alignItems="start"
                  px={3}
                  py={2}
                  gap={2}
                >
                  <SelectComponent
                    label="Status"
                    options={["APPROVED", "COMPLETED", "PENDING", "OVERDUE"]}
                  />
                  <Box>
                    <Typography
                      fontSize="13px"
                      color={"GrayText"}
                      fontWeight={700}
                    >
                      {"Select Date Range"}
                    </Typography>
                    <DateRangePopover />
                  </Box>
                  <Button label="Done" onClick={() => setPopoverOpen(null)} />
                </Grid>
              </Box>
            </Popover>
          </>
        )}
      </Box>
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

interface DataGridHeadCellProps {
  column: Column;
}

interface DataGridCellProps {
  row: Row;
  col: Column;
}

interface DataGridComponentProps {
  showSearch?: boolean;
  showFilters?: boolean;
  columns: Column[];
  data: Row[];
  query?: string;
  setQuery?: (query: string) => void;
  sx?: any;
  isLoading?: boolean;
  placeholder?: string;
}
