import { Box, Divider, Typography } from "@mui/material";
import { useState } from "react";
import DataGrid from "../../../../components/DataGrid/DataGridMain.component";
import { en } from "../../../../constants/labels";
import { ROUTES } from "../../../../constants/routes";
import { BreadCrumbsComp } from "../../../../features/BreadCrumbs";
import { useDataGrid } from "../../../../hooks/datagrid.hooks";
import { useGetMyTasks } from "../../../../hooks/tasks.hooks";
import PageLayout from "../../../../layouts/PageLayout";
import { FilterMap } from "../../../../types/common.types";
import { Task } from "../../../../types/task.types";
import { getMyTasksColumns } from "../../../../utils/tasks.utils";

const MyTasks = () => {
  const { data, isLoading } = useGetMyTasks();
  const columns = getMyTasksColumns();

  const [query, setQuery] = useState("");
  const [filterMap, setFilterMap] = useState<FilterMap>({});
  const { paginationProps, dataGridProps } = useDataGrid({
    columns,
    data: data as Task[],
    pageSize: 10,
    query,
    filterMap,
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
        </Box>
        <Divider sx={{ my: 0 }} />
        <DataGrid
          {...dataGridProps}
          isLoading={isLoading}
          query={query}
          setQuery={setQuery}
          placeholder={en.searchTaskName}
          filterMap={filterMap}
          setFilterMap={(value) => setFilterMap(value)}
        />
      </Box>
    </PageLayout>
  );
};

export default MyTasks;
