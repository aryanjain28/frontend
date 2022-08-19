import { Box, Divider, Typography } from "@mui/material";
import { useState } from "react";
import { en } from "../../../../constants/labels";
import { ROUTES } from "../../../../constants/routes";
import { BreadCrumbsComp } from "../../../../features/BreadCrumbs";
import NewClientForm from "../../../../features/NewClientForm";
import PageLayout from "../../../../layouts/PageLayout";
import { palette } from "../../../../styles/theme";
import { ModifiedClientFields } from "../../../../types/clients.types";

const CreateClient = () => {
  const [formValues, setFormValues] = useState<ModifiedClientFields>({
    gstIn: "",
    registrationDate: "",
    taxpayerType: "",
    legalName: "",
    businessName: "",
    businessConstitution: "",
    businessActivity: "",
    panNumber: "",
  });
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
                { label: en.dashboard as string, url: ROUTES.dashboard },
                { label: en.newClient as string, url: ROUTES.createClient },
              ]}
            />
            <Typography mx={3} color={palette.primary.main} variant="h6">
              {en.createNewClient}
            </Typography>
          </Box>
        </Box>
        <Divider sx={{ my: 0 }} />
        <NewClientForm
          formValues={formValues}
          setFormValues={setFormValues}
          onSave={() => console.log(formValues)}
        />
      </Box>
    </PageLayout>
  );
};

export default CreateClient;
