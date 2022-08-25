import { Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import DataGrid from "../../../components/DataGrid/DataGridMain.component";
import { en } from "../../../constants/labels";
import { ROUTES } from "../../../constants/routes";
import { BreadCrumbsComp } from "../../../features/BreadCrumbs";
import { useGetClients } from "../../../hooks/clients.hooks";
import { useDataGrid } from "../../../hooks/datagrid.hooks";
import PageLayout from "../../../layouts/PageLayout";
import { palette } from "../../../styles/theme";
import { Client, ModClient } from "../../../types/clients.types";
import { getClientsColumns } from "../../../utils/clients.utils";

const Clients = () => {
  const [expandedRowId, setExpandedRowId] = useState<string | number | null>(
    null
  );
  const columns = getClientsColumns(expandedRowId, setExpandedRowId);
  const { data, isFetching: isLoading } = useGetClients();

  const [query, setQuery] = useState("");
  const { paginationProps, dataGridProps } = useDataGrid({
    columns,
    data: data as Client[],
    pageSize: 10,
    query,
    expandedRowId: expandedRowId as string,
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
          isLoading={isLoading}
          query={query}
          setQuery={setQuery}
          showFilters={false}
          expandedRowId={expandedRowId as string}
        />
      </Box>
    </PageLayout>
  );
};

export default Clients;
