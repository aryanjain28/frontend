import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/material";
import { en } from "../constants/labels";
import ITIcon from "@mui/icons-material/RequestPageOutlined";
import GSTIcon from "@mui/icons-material/DocumentScannerOutlined";
import CompanyIcon from "@mui/icons-material/ApartmentOutlined";
import TallyIcon from "@mui/icons-material/TextSnippetOutlined";
import AuditIcon from "@mui/icons-material/InventoryOutlined";
import OtherIcon from "@mui/icons-material/AltRouteOutlined";

function Clients() {
  const clients = [
    {
      label: "IT",
      count: 182,
      icon: <ITIcon fontSize="large" />,
    },
    {
      label: "GST",
      count: 51,
      icon: <GSTIcon fontSize="large" />,
    },
    {
      label: "Company",
      count: 12,
      icon: <CompanyIcon fontSize="large" />,
    },
    {
      label: "Tally",
      count: 135,
      icon: <TallyIcon fontSize="large" />,
    },
    {
      label: "Audit",
      count: 52,
      icon: <AuditIcon fontSize="large" />,
    },
    {
      label: "Other",
      count: 52,
      icon: <OtherIcon fontSize="large" />,
    },
  ];
  return (
    <Box my={2}>
      <Typography my={1} fontSize={"15px"} fontWeight={600} color="#777777">
        {en.clients}
      </Typography>

      <Grid
        container
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        xs={12}
      >
        {clients.map(({ label, icon, count }) => {
          return (
            <Grid item xs={1.8}>
              <Box p={2} borderRadius={"10px"} sx={{ boxShadow: 3 }}>
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
