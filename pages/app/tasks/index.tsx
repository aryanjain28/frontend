import { useGetAllTasks } from "../../../hooks/tasks.hooks";
import { Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { BreadCrumbsComp } from "../../../features/BreadCrumbs";
import { useDataGrid } from "../../../hooks/datagrid.hooks";
import PageLayout from "../../../layouts/PageLayout";
import { Task } from "../../../types/task.types";
import { getTasksCol } from "../../../utils/tasks.utils";
import { en } from "../../../constants/labels";
import { ROUTES } from "../../../constants/routes";
import DataGrid from "../../../components/DataGrid/DataGridMain.component";
import { FilterMap } from "../../../types/common.types";
import { useRouter } from "next/router";

const Tasks = () => {
  const router = useRouter();
  const status = router.query?.status;
  const taskId = router.query?.taskId;

  const [expandedRowId, setExpandedRowId] = useState<string | null>(
    (taskId as string) || null
  );
  const columns = getTasksCol(expandedRowId, setExpandedRowId);
  const { data, isLoading } = useGetAllTasks();

  const [query, setQuery] = useState("");
  const [filterMap, setFilterMap] = useState<FilterMap>(
    status ? { status: [`${status}`] } : {}
  );
  const { paginationProps, dataGridProps } = useDataGrid({
    columns,
    data: data as Task[],
    pageSize: 10,
    query,
    filterMap,
    expandedRowId,
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
              ]}
            />
            <Typography mx={3} color="#0B1246" variant="h6">
              {en.allTasks}
            </Typography>
          </Box>
        </Box>
        <Divider sx={{ my: 0 }} />
        <DataGrid
          {...dataGridProps}
          isLoading={isLoading}
          showSearch
          showFilters
          query={query}
          setQuery={setQuery}
          filterMap={filterMap}
          setFilterMap={setFilterMap}
          expandedRowId={expandedRowId}
          setExpandedRowId={(val) => setExpandedRowId(val)}
        />
      </Box>
    </PageLayout>
  );
};

export default Tasks;
