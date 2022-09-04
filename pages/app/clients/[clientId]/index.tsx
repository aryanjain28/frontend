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
import { getClientInfoInit } from "../../../../utils/clients.utils";
import { isEmptyObject } from "../../../../utils/common.utils";

const EditClient = () => {
  const router = useRouter();
  const clientId = router.query.clientId;
  const { data = {}, isFetching: isLoading } = useGetClientDetails(
    clientId as string
  );
  const { mutate: updateClientInfo, isLoading: isUpdating } = usePatchClient();

  const [formValues, setFormValues] = useState<ModifiedClientFields>(
    getClientInfoInit()
  );

  useEffect(() => {
    setFormValues({
      ...formValues,
      ...data,
      additionalInfo: JSON.parse((data?.additionalInfo as string) || "[]"),
    });
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
                { label: en.clients as string, url: ROUTES.clients },
                { label: formValues.firstName || "", url: "#" },
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
                updateClientInfo({
                  payload: {
                    data: {
                      ...formValues,
                      additionalInfo: JSON.stringify(formValues.additionalInfo),
                    },
                  },
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
