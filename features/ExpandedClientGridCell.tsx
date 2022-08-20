import {
  Box,
  Collapse,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Row } from "../types/datagrid.types";
import { palette } from "../styles/theme";

const ExpandedClientGridCell = ({
  row = {},
  open,
  colSpan,
}: {
  row: Row;
  open: boolean;
  colSpan: number;
}) => {
  const history = [
    {
      date: "2020-01-05",
      customerId: "GST-3B",
      amount: 32345,
      balance: 24356,
    },
    {
      date: "2020-01-02",
      customerId: "GST-3B",
      amount: 12345,
      balance: 24356,
    },
    {
      date: "2020-01-05",
      customerId: "GST-3R",
      amount: 32345,
      balance: 24356,
    },
    {
      date: "2020-01-02",
      customerId: "IT",
      amount: 12345,
      balance: 24356,
    },
    {
      date: "2020-01-05",
      customerId: "Audit",
      amount: 32345,
      balance: 24356,
    },
    {
      date: "2020-01-02",
      customerId: "Registration",
      amount: 12345,
      balance: 24356,
    },
    {
      date: "2020-01-05",
      customerId: "Other",
      amount: 32345,
      balance: 24356,
    },
    {
      date: "2020-01-02",
      customerId: "Other",
      amount: 12345,
      balance: 24356,
    },
    {
      date: "2020-01-05",
      customerId: "Tally",
      amount: 32345,
      balance: 24356,
    },
    {
      date: "2020-01-02",
      customerId: "Tally",
      amount: 12345,
      balance: 24356,
    },
  ];
  return (
    <TableCell style={{ padding: 0 }} colSpan={colSpan}>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Box
          width="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{ background: palette.primary.light }}
        >
          <Box my={2} width="50%" sx={{ boxShadow: 3 }}>
            <TableContainer sx={{ maxHeight: 300 }}>
              <Table size="small" stickyHeader>
                <TableHead>
                  <TableRow sx={{ background: palette.primary.black }}>
                    <TableCell
                      sx={{
                        background: palette.primary.main,
                        color: palette.primary.white,
                      }}
                    >
                      Date
                    </TableCell>
                    <TableCell
                      sx={{
                        background: palette.primary.main,
                        color: palette.primary.white,
                      }}
                    >
                      Job
                    </TableCell>
                    <TableCell
                      sx={{
                        background: palette.primary.main,
                        color: palette.primary.white,
                      }}
                      align="right"
                    >
                      Amount
                    </TableCell>
                    <TableCell
                      sx={{
                        background: palette.primary.main,
                        color: palette.primary.white,
                      }}
                      align="right"
                    >
                      Balance
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {history.map((historyRow) => (
                    <TableRow
                      key={historyRow.date}
                      sx={{ background: palette.primary.white }}
                    >
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                      <TableCell align="right">{historyRow.balance}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Collapse>
    </TableCell>
  );
};

export default ExpandedClientGridCell;
