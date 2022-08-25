import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { Loader } from "../components/Loader";
import { en } from "../constants/labels";
import { palette } from "../styles/theme";
import { Row } from "../types/datagrid.types";
import { CustomTooltip } from "./CustomTooltip";

const DataCell = ({ value }: { value: string }) => (
  <TableCell sx={{ borderRight: `1px ${palette.neutral.tint} solid` }}>
    <Box display="flex">
      <CustomTooltip title={value}>
        <Typography maxWidth={150} noWrap>
          {value}
        </Typography>
      </CustomTooltip>
    </Box>
  </TableCell>
);

interface ViewTableProps {
  columns: String[];
  data: Row[];
  isLoading: boolean;
  colSpan: number;
  height?: number;
}

export const ViewTable = ({
  columns,
  data,
  isLoading,
  colSpan,
  height,
}: ViewTableProps) => {
  return (
    <TableContainer sx={{ height: "100%", borderRadius: 3 }}>
      <Table size="small" stickyHeader>
        <TableHead>
          <TableRow sx={{ background: palette.primary.black }}>
            {columns.map((column) => (
              <TableCell
                sx={{
                  background: palette.primary.main,
                  color: palette.primary.white,
                }}
              >
                {column}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell sx={{ p: 0 }} colSpan={colSpan}>
                <Box
                  height={height || 300}
                  width="100%"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: palette.primary.white,
                  }}
                >
                  <Loader />
                </Box>
              </TableCell>
            </TableRow>
          ) : data.length < 1 ? (
            <TableRow>
              <TableCell sx={{ p: 0 }} colSpan={colSpan}>
                <Box
                  height={height || 300}
                  width="100%"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: palette.primary.white,
                  }}
                >
                  <Typography letterSpacing={2}>{en.wowSoEmpty}</Typography>
                </Box>
              </TableCell>
            </TableRow>
          ) : (
            data.map((row, index: number) => (
              <TableRow
                key={`${index}_${Math.random()}`}
                sx={{ background: palette.primary.white }}
              >
                {Object.values(row).map((value) => (
                  <DataCell value={value || ""} />
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
