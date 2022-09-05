import {
  CircularProgress,
  Divider,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { en } from "../../../../constants/labels";
import { ROUTES } from "../../../../constants/routes";
import { BreadCrumbsComp } from "../../../../features/BreadCrumbs";
import { ClientDetailsViewOnly } from "../../../../features/ClientDetailsTabular";
import UpdateClientForm from "../../../../features/ClientForm";
import { ClientJobDetails } from "../../../../features/ClientJobDetails";
import {
  useGetClientDetails,
  usePatchClient,
} from "../../../../hooks/clients.hooks";
import PageLayout from "../../../../layouts/PageLayout";
import { palette } from "../../../../styles/theme";
import { ModifiedClientFields } from "../../../../types/clients.types";
import { getClientInfoInit } from "../../../../utils/clients.utils";
import { isEmptyObject } from "../../../../utils/common.utils";

function TabPanel(props: TabPanelProps) {
  const { children, value, active } = props;
  return <Box hidden={value !== active}>{value === active && children}</Box>;
}

const ClientDetails = ({
  isLoading,
  clientId,
  formValues,
  setFormValues,
}: {
  isLoading: boolean;
  clientId: string;
  formValues: ModifiedClientFields;
  setFormValues: (value: ModifiedClientFields) => void;
}) => {
  const { mutate: updateClientInfo, isLoading: isUpdating } = usePatchClient();
  return isLoading ? (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height={500}
    >
      <CircularProgress color="inherit" sx={{ ml: 1 }} size={20} />
    </Box>
  ) : (
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
  );
};

const EditClient = () => {
  const [active, setActive] = useState<number>(0);

  const router = useRouter();
  const clientId = router.query.clientId;

  const { data = {}, isFetching: isLoading } = useGetClientDetails(
    clientId as string
  );
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
                {
                  label: `${formValues.firstName} ${
                    formValues.middleName || ""
                  } ${formValues.lastName || ""}`,
                  url: "#",
                },
              ]}
            />
            <Typography mx={3} color={palette.primary.main} variant="h6">
              {en.clientDetails}
            </Typography>
          </Box>
        </Box>
        <Divider sx={{ my: 0 }} />
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs value={active} onChange={(e, active) => setActive(active)}>
              <Tab
                sx={{ minWidth: "33%", textTransform: "none" }}
                label={en.updateClientDetails}
              />
              <Tab
                sx={{ minWidth: "33%", textTransform: "none" }}
                label={en.jobDetails}
              />
              <Tab
                sx={{ minWidth: "33%", textTransform: "none" }}
                label={en.viewOnly}
              />
            </Tabs>
          </Box>
          <TabPanel active={active} value={0}>
            {data && !isEmptyObject(data) && clientId && (
              <ClientDetails
                clientId={clientId as string}
                formValues={formValues}
                setFormValues={setFormValues}
                isLoading={isLoading}
              />
            )}
          </TabPanel>
          <TabPanel active={active} value={1}>
            <ClientJobDetails />
          </TabPanel>
          <TabPanel active={active} value={2}>
            {data && !isEmptyObject(data) && clientId && (
              <ClientDetailsViewOnly data={formValues} />
            )}
          </TabPanel>
        </Box>
      </Box>
    </PageLayout>
  );
};

interface TabPanelProps {
  children?: React.ReactNode;
  value: 0 | 1 | 2;
  active: number;
}

export default EditClient;
