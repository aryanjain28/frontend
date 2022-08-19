import { Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import { useState } from "react";
import DataGrid from "../../../components/DataGrid/DataGridMain.component";
import { en } from "../../../constants/labels";
import { ROUTES } from "../../../constants/routes";
import { BreadCrumbsComp } from "../../../features/BreadCrumbs";
import { useGetLocalStorage } from "../../../hooks/auth.hooks";
import { useGetClients } from "../../../hooks/clients.hooks";
import { useDataGrid } from "../../../hooks/datagrid.hooks";
import PageLayout from "../../../layouts/PageLayout";
import { palette } from "../../../styles/theme";
import { Client, ModClient } from "../../../types/clients.types";
import { getClientsColumns } from "../../../utils/clients.utils";

const Clients = () => {
  const router = useRouter();
  const { userId } = useGetLocalStorage();

  const columns = getClientsColumns();
  const { data, isLoading } = useGetClients();

  console.log("data: ", data);

  const [query, setQuery] = useState("");
  const { paginationProps, dataGridProps } = useDataGrid({
    columns,
    data: data as ModClient[],
    pageSize: 10,
    query,
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
                { label: en.dashboard, url: ROUTES.dashboard },
                { label: en.clients, url: ROUTES.clients },
              ]}
            />
            <Typography mx={3} color={palette.primary.main} variant="h6">
              {en.clients}
            </Typography>
          </Box>
        </Box>
        <Divider sx={{ my: 0 }} />
        <DataGrid
          {...dataGridProps}
          data={data as ModClient[]}
          columns={columns}
          isLoading={isLoading}
          query={query}
          setQuery={setQuery}
          showFilters={false}
        />
      </Box>
    </PageLayout>
  );
};

export default Clients;
