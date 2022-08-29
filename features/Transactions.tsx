import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/material";
import { en } from "../constants/labels";
import { palette } from "../styles/theme";
import { useEffect, useState } from "react";
import { transactions } from "../constants/dashboard.constants";

function Transactions({
  amount: { totalAmount = 0, balanceAmount = 0, paidAmount = 0 },
}: {
  amount: { totalAmount: number; balanceAmount: number; paidAmount: number };
}) {
  const [amountState, setAmountState] = useState([
    totalAmount,
    balanceAmount,
    paidAmount,
  ]);

  useEffect(() => {
    setAmountState([totalAmount, balanceAmount, paidAmount]);
  }, [totalAmount, balanceAmount, paidAmount]);

  return (
    <Box my={2}>
      <Typography
        my={1}
        fontSize={"15px"}
        fontWeight={600}
        color={palette.neutral.main}
      >
        {en.transactions}
      </Typography>

      <Grid
        container
        display="flex"
        alignItems="center"
        justifyContent="start"
        xs={12}
        gap={2}
      >
        {transactions.map(({ label, icon }, index) => {
          const count = amountState[index];
          return (
            <Grid key={`${label}_${index}`} item xs={2}>
              <Box
                p={2}
                borderRadius={"10px"}
                sx={{ boxShadow: 3, cursor: "pointer" }}
              >
                <Grid
                  container
                  xs={12}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Grid item xs={4}>
                    {icon}
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1">{label}</Typography>
                    <Typography variant="body2">
                      &#8377;&nbsp;{count}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}

interface TransactionsProps {}

export default Transactions;
