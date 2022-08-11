import { useGetAllTasks } from "../../../hooks/tasks.hooks";
import { Add } from "@mui/icons-material";
import { Divider, Paper, Typography } from "@mui/material";
import { borderRadius, Box, height } from "@mui/system";
import { useState } from "react";
import { DataGridComponent } from "../../../components/DataGrid/DataGrid.component";
import { BreadCrumbsComp } from "../../../features/BreadCrumbs";
import { useDataGrid } from "../../../hooks/datagrid.hooks";
import PageLayout from "../../../layouts/PageLayout";
import { Task } from "../../../types/task.types";
import { getTasksCol } from "../../../utils/tasks.utils";
import { en } from "../../../constants/labels";
import { ROUTES } from "../../../constants/routes";

const Tasks = () => {
  const columns = getTasksCol();
  const { data, isLoading } = useGetAllTasks();

  const [query, setQuery] = useState("");
  const { paginationProps, dataGridProps } = useDataGrid({
    columns,
    data: data as Task[],
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
              breadCrumbs={[
                { label: "Dashboard", url: ROUTES.dashboard },
                { label: "All Tasks", url: ROUTES.tasks },
              ]}
            />
            <Typography mx={3} color="#0B1246" variant="h6">
              {en.allTasks}
            </Typography>
          </Box>
          {/* <Button
            sx={{ mx: 2 }}
            label="Add New User"
            icon={<Add />}
            onClick={() => router.push(`/app/customers/customer`)}
          /> */}
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

export default Tasks;
