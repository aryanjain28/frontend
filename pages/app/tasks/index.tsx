import {
  useGetAllModifiedTasks,
  useGetAllTasks,
} from "../../../hooks/tasks.hooks";
import { Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { BreadCrumbsComp } from "../../../features/BreadCrumbs";
import { useDataGrid } from "../../../hooks/datagrid.hooks";
import PageLayout from "../../../layouts/PageLayout";
import { ModifiedTask, Task } from "../../../types/task.types";
import { getTasksCol } from "../../../utils/tasks.utils";
import { en } from "../../../constants/labels";
import { ROUTES } from "../../../constants/routes";
import { FilterMap } from "../../../types/common.types";
import { useRouter } from "next/router";
import DataGridFeatures from "../../../components/DataGrid/DataGridFeatures.component";
import DataGridTableComponent from "../../../components/DataGrid/DataGridTable.component";
import { Button } from "../../../components/Button";
import { Add } from "@mui/icons-material";
import { isAdmin } from "../../../utils/common.utils";
import { useGetLocalStorage } from "../../../hooks/auth.hooks";
import { palette } from "../../../styles/theme";

const Tasks = () => {
  const router = useRouter();
  const { userId } = useGetLocalStorage();
  const status = router.query?.status;
  const taskId = router.query?.taskId;

  const [expandedRowId, setExpandedRowId] = useState<string | null>(
    (taskId as string) || null
  );
  const columns = getTasksCol(expandedRowId, setExpandedRowId);
  const { isFetching: isLoading } = useGetAllTasks(userId as string);
  const { data } = useGetAllModifiedTasks();

  const [query, setQuery] = useState("");
  const [filterMap, setFilterMap] = useState<FilterMap>(
    status ? { status: [`${status}`] } : {}
  );
  const { paginationProps, dataGridProps } = useDataGrid({
    columns,
    data: data as ModifiedTask[],
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
          border: `${palette.secondary.light} 1.5px solid`,
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
            <Typography mx={3} color={palette.primary.main} variant="h6">
              {en.allTasks}
            </Typography>
          </Box>
        </Box>
        <Divider sx={{ my: 0 }} />
        <Box mx={3}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <DataGridFeatures
              query={query}
              setQuery={setQuery}
              placeholder={en.searchTaskName}
              filterMap={filterMap}
              setFilterMap={(value) => setFilterMap(value)}
            />
            {isAdmin() && (
              <Button
                label={en.createNewTask}
                onClick={() => router.push(ROUTES.createTask)}
                variant="contained"
                icon={<Add fontSize="small" />}
                sx={{ width: "20%", textTransform: "none" }}
              />
            )}
          </Box>
          <DataGridTableComponent
            {...dataGridProps}
            isLoading={isLoading}
            expandedRowId={expandedRowId}
          />
        </Box>
      </Box>
    </PageLayout>
  );
};

export default Tasks;
