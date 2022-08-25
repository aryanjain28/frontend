import { Box, Collapse, TableCell } from "@mui/material";
import { Row } from "../types/datagrid.types";
import { palette } from "../styles/theme";
import { useGetClientTasks } from "../hooks/clients.hooks";
import { formatTime2, formatTime4 } from "../utils/common.utils";
import { ViewTable } from "./ViewTable";

const ExpandedClientGridCell = ({
  row = {},
  open,
  colSpan,
}: {
  row: Row;
  open: boolean;
  colSpan: number;
}) => {
  const { data: tableData, isFetching } = useGetClientTasks(
    open ? row.id : null
  );
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
          <Box my={2} width="50%" sx={{ boxShadow: 3, borderRadius: 3 }}>
            <ViewTable
              data={
                tableData?.map(
                  ({
                    startDate,
                    taskTypeChildName,
                    totalAmount,
                    paidAmount,
                  }) => ({
                    startDate: formatTime4(startDate),
                    taskTypeChildName,
                    totalAmount,
                    paidAmount: paidAmount || 0,
                    balanceAmount: totalAmount - paidAmount,
                  })
                ) || []
              }
              columns={["Date", "Job", "Amount", "Paid", "Balance"]}
              isLoading={isFetching}
              colSpan={5}
              height={100}
            />
          </Box>
        </Box>
      </Collapse>
    </TableCell>
  );
};

export default ExpandedClientGridCell;
