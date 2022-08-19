import { Box, Divider, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { en } from "../../../../constants/labels";
import { ROUTES } from "../../../../constants/routes";
import { BreadCrumbsComp } from "../../../../features/BreadCrumbs";
import NewClientForm from "../../../../features/NewClientForm";
import { useGetLocalStorage } from "../../../../hooks/auth.hooks";
import PageLayout from "../../../../layouts/PageLayout";
import { palette } from "../../../../styles/theme";

const CreateClient = () => {
  return (
    <PageLayout>
      <Box
        sx={{
          mx: 4,
          my: 2,
          border: `${palette.secondary.light} 1.5px solid`,
          borderRadius: "5px",
        }}
      >
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <BreadCrumbsComp
              breadCrumbs={[
                { label: en.dashboard, url: ROUTES.dashboard },
                { label: en.newClient, url: ROUTES.createClient },
              ]}
            />
            <Typography mx={3} color={palette.primary.main} variant="h6">
              {en.createNewClient}
            </Typography>
          </Box>
        </Box>
        <Divider sx={{ my: 0 }} />
        <NewClientForm />
      </Box>
    </PageLayout>
  );
};

export default CreateClient;
