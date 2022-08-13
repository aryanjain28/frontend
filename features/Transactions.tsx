import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/material";
import { en } from "../constants/labels";
import TotalFeesIcon from "@mui/icons-material/ArticleOutlined";
import TotalPaidIcon from "@mui/icons-material/GradingOutlined";
import BalanceIcon from "@mui/icons-material/NoteAddOutlined";

function Transactions() {
  const transactions = [
    {
      label: "Total Fees",
      count: 439032,
      icon: <TotalFeesIcon fontSize="large" />,
    },
    {
      label: "Total Paid",
      count: 181922,
      icon: <TotalPaidIcon fontSize="large" />,
    },
    {
      label: "Balance",
      count: 419843,
      icon: <BalanceIcon fontSize="large" />,
    },
  ];
  return (
    <Box my={2}>
      <Typography my={1} fontSize={"15px"} fontWeight={600} color="#777777">
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
        {transactions.map(({ label, icon, count }, index) => {
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
