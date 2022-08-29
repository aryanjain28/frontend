import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/material";
import { en } from "../constants/labels";
import { palette } from "../styles/theme";
import { useEffect, useState } from "react";
import { clients } from "../constants/dashboard.constants";

function Clients({
  types: {
    gst = 0,
    it = 0,
    tally = 0,
    reports = 0,
    registrations = 0,
    others = 0,
  },
}: {
  types: {
    gst: number;
    it: number;
    tally: number;
    reports: number;
    registrations: number;
    others: number;
  };
}) {
  const [typesState, setTypesState] = useState([
    gst,
    it,
    tally,
    reports,
    registrations,
    others,
  ]);

  useEffect(() => {
    setTypesState([gst, it, tally, reports, registrations, others]);
  }, [gst, it, tally, reports, registrations, others]);

  return (
    <Box my={2}>
      <Typography
        my={1}
        fontSize={"15px"}
        fontWeight={600}
        color={palette.neutral.main}
      >
        {en.clients}
      </Typography>

      <Grid
        container
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        xs={12}
      >
        {clients.map(({ label, icon }, index) => {
          const count = typesState[index];
          return (
            <Grid item xs={1.8} key={`${label}_${index}`}>
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
                    <Typography variant="body2">{count}</Typography>
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

interface ClientsProps {}

export default Clients;
