import { Box, Collapse, TableCell } from "@mui/material";
import { Row } from "../types/datagrid.types";
import { useGetClientTasks } from "../hooks/clients.hooks";
import { formatTime4 } from "../utils/common.utils";
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
    <Box my={2} width="60%" sx={{ boxShadow: 3, borderRadius: 3 }}>
      <ViewTable
        data={
          tableData?.map(
            ({ startDate, taskTypeChildName, totalAmount, paidAmount }) => ({
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
  );
};

export default ExpandedClientGridCell;
