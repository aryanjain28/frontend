import { CircularProgress, Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { en } from "../../../../constants/labels";
import { ROUTES } from "../../../../constants/routes";
import { BreadCrumbsComp } from "../../../../features/BreadCrumbs";
import UpdateClientForm from "../../../../features/ClientForm";
import {
  useGetClientDetails,
  usePatchClient,
} from "../../../../hooks/clients.hooks";
import PageLayout from "../../../../layouts/PageLayout";
import { palette } from "../../../../styles/theme";
import { ModifiedClientFields } from "../../../../types/clients.types";
import { isEmptyObject } from "../../../../utils/common.utils";

const EditClient = () => {
  const router = useRouter();
  const clientId = router.query.clientId;
  const { data = {}, isFetching: isLoading } = useGetClientDetails(
    clientId as string
  );
  const { mutate: updateClientInfo, isLoading: isUpdating } = usePatchClient();

  const [formValues, setFormValues] = useState<ModifiedClientFields>({
    gstIn: "",
    registrationDate: "",
    taxpayerType: "",
    legalName: "",
    businessName: "",
    businessConstitution: "",
    businessActivity: "",
    panNumber: "",
    pincode: "",
    name: "",
    address: "",
    city: "",
    primaryMobile: "",
    primaryEmail: "",
    secondaryMobile: "",
    gstUsername: "",
    gstPassword: "",
    district: "",
    state: "",
  });

  useEffect(() => {
    setFormValues({ ...formValues, ...data });
  }, [data]);

  return (
    <PageLayout>
      <Box
        sx={{
          border: `${palette.secondary.light} 1.5px solid`,
          borderRadius: "5px",
        }}
      >
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box mb={1}>
            <BreadCrumbsComp
              breadCrumbs={[
                { label: en.dashboard as string, url: ROUTES.dashboard },
                { label: en.updatedClientInfo as string, url: "#" },
                { label: formValues.name || "", url: "#" },
              ]}
            />
            <Typography mx={3} color={palette.primary.main} variant="h6">
              {en.updatedClientInfo}
            </Typography>
          </Box>
        </Box>
        <Divider sx={{ my: 0 }} />
        {isLoading ? (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            height={500}
          >
            <CircularProgress color="inherit" sx={{ ml: 1 }} size={20} />
          </Box>
        ) : (
          data &&
          !isEmptyObject(data) && (
            <UpdateClientForm
              formValues={formValues}
              setFormValues={setFormValues}
              isSaving={isUpdating}
              onSave={() => {
                console.log(formValues);
                updateClientInfo({
                  payload: { data: formValues },
                  clientId: clientId as string,
                });
              }}
              isUpdate
            />
          )
        )}
      </Box>
    </PageLayout>
  );
};

export default EditClient;
