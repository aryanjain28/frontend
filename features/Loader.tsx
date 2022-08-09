import { CircularProgress, Grid } from "@mui/material";

const FullPageLoader = () => (
  <Grid
    display="flex"
    alignItems="center"
    justifyContent="center"
    style={{ minHeight: "90vh" }}
  >
    <CircularProgress />
  </Grid>
);

export default FullPageLoader;
