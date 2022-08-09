import { Divider, Grid, Icon, Typography } from "@mui/material";
import { Box } from "@mui/material";
import { en } from "../../../constants/labels";
import PageLayout, { SvgIcon } from "../../../layouts/PageLayout";
import Tasks from "../../../features/Tasks";
import Clients from "../../../features/Clients";
import Transactions from "../../../features/Transactions";

const Header = () => (
  <>
    <Typography my={1} fontSize={"15px"} fontWeight={600} color="#777777">
      {en.myFirm}
    </Typography>
    <Box width={"60%"} p={1} borderRadius={"10px"} sx={{ boxShadow: 3 }}>
      <Grid
        container
        xs={12}
        display="flex"
        alignItems="center"
        justifyContent="space-evenly"
      >
        <Grid item xs={4}>
          <Box display="flex" alignItems="center" justifyContent="center">
            <SvgIcon src="/images/CALogo.svg" sx={{ maxWidth: "50%" }} />
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h5" py={1}>
            {en.firm.name}
          </Typography>
          <Typography variant="body1">{en.firm.address}</Typography>
          <Typography variant="body2" py={1}>
            {en.firm.mobile}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  </>
);

const dashboard = () => {
  return (
    <PageLayout>
      <Header />
      <Tasks />
      <Divider />
      <Clients />
      <Divider />
      <Transactions />
    </PageLayout>
  );
};

export default dashboard;
