import { Search } from "@mui/icons-material";
import {
  Box,
  CircularProgress,
  Input,
  Pagination,
  Stack,
  Table as MUITable,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { FormInput } from "../../features/FormInput";
import { Column, Row } from "../../types/datagrid.types";

const DataGridHeadCell = (props: DataGridHeadCellProps) => {
  const { column } = props;
  return (
    <TableCell sx={{ p: 1, m: 0, background: "#FAFAFA" }}>
      <Box sx={{}}>
        <Typography
          sx={{ color: "#0B1246" }}
          fontSize="13px"
          fontWeight={700}
          variant="body2"
        >
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
          <Typography sx={{ color: "#0B1246" }} fontSize="13px" variant="body2">
            {value}
          </Typography>
        )}
      </Box>
    </TableCell>
  );
};

export const DataGridComponent = (props: DataGridComponentProps) => {
  const { showSearch, data, columns, query, setQuery, isLoading } = props;

  return (
    <Box justifyContent="center" sx={{ mx: 3 }}>
      {showSearch && (
        <FormInput
          label="Search Table"
          value={query || ""}
          handleOnChange={(value) => setQuery!(value as string)}
        />
      )}
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
              justifyContent: "center",
            }}
          >
            <CircularProgress
              color="primary"
              sx={{ my: 5, fontSize: "10px" }}
            />
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
              {data.map((row) => {
                return (
                  <TableRow>
                    {columns.map((col) =>
                      col.hidden ? null : (
                        <DataGridCell key={col.key} row={row} col={col} />
                      )
                    )}
                  </TableRow>
                );
              })}
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
  showSearch: boolean;
  columns: Column[];
  data: Row[];
  query?: string;
  setQuery?: (query: string) => void;
  sx?: any;
  isLoading?: boolean;
}
