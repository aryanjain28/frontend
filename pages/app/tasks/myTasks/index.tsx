import { Box, Divider, Typography } from "@mui/material";
import { useState } from "react";
import { DataGridComponent } from "../../../../components/DataGrid/DataGrid.component";
import { en } from "../../../../constants/labels";
import { ROUTES } from "../../../../constants/routes";
import { BreadCrumbsComp } from "../../../../features/BreadCrumbs";
import { useDataGrid } from "../../../../hooks/datagrid.hooks";
import { useGetMyTasks } from "../../../../hooks/tasks.hooks";
import PageLayout from "../../../../layouts/PageLayout";
import { Task } from "../../../../types/task.types";
import { getMyTasksColumns } from "../../../../utils/tasks.utils";

const MyTasks = () => {
  const { data, isLoading } = useGetMyTasks();
  const columns = getMyTasksColumns();

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
                { label: en.dashboard, url: ROUTES.dashboard },
                { label: en.allTasks, url: ROUTES.tasks },
                { label: en.myTasks, url: ROUTES.myTasks },
              ]}
            />
            <Typography mx={3} variant="h6">
              {en.myTasks}
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
          query={query}
          setQuery={setQuery}
          placeholder={en.searchTaskName}
        />
      </Box>
    </PageLayout>
  );
};

export default MyTasks;
