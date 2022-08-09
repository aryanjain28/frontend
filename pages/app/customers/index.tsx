import { Add } from "@mui/icons-material";
import { Divider, Paper, Typography } from "@mui/material";
import { borderRadius, Box, height } from "@mui/system";
import { Router, useRouter } from "next/router";
import { useState } from "react";
import { Button } from "../../../components/Button";
import { DataGridComponent } from "../../../components/DataGrid/DataGrid.component";
import { BreadCrumbsComp } from "../../../features/BreadCrumbs";
import { useGetCustomers } from "../../../hooks/customers.hooks";
import { useDataGrid } from "../../../hooks/datagrid.hooks";
import PageLayout from "../../../layouts/PageLayout";
import { getCustomerCol } from "../../../utils/customers.utils";

const Customer = () => {
  const router = useRouter();
  const columns = getCustomerCol();

  const [query, setQuery] = useState("");
  const { data: customerData, isLoading } = useGetCustomers();
  const { paginationProps, dataGridProps } = useDataGrid({
    columns,
    data: customerData || [],
    pageSize: 10,
    query,
  });
  return (
    <PageLayout>
      <Box
        sx={{
          mx: 4,
          my: 2,
          border: "#dadada 1.5px solid",
          borderRadius: "5px",
        }}
      >
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <BreadCrumbsComp
              breadCrumbs={[{ label: "Customers", url: "/app/customers" }]}
            />
            <Typography mx={3} color="#0B1246" variant="h6">
              Customer Connections
            </Typography>
          </Box>
          <Button
            sx={{ mx: 2 }}
            label="Add New User"
            icon={<Add />}
            onClick={() => router.push(`/app/customers/customer`)}
          />
        </Box>
        <Divider sx={{ my: 0 }} />
        <DataGridComponent
          {...dataGridProps}
          isLoading={isLoading}
          showSearch
          query={query}
          setQuery={setQuery}
        />
      </Box>
    </PageLayout>
  );
};

export default Customer;
