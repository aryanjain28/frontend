import { Box } from "@mui/system";
import { useRouter } from "next/router";
import { ViewTable } from "../features/ViewTable";
import { useGetClientTasks } from "../hooks/clients.hooks";
import { palette } from "../styles/theme";
import { formatTime4 } from "../utils/common.utils";

export const ClientJobDetails = () => {
  const router = useRouter();
  const clientId = router.query.clientId;
  const { data: tableData, isFetching } = useGetClientTasks(clientId as string);
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      width="100%"
      sx={{ background: palette.primary.light }}
      py={2}
    >
      <Box width="60%" py={2}>
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
    </Box>
  );
};
