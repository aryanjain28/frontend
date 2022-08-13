import { useGetAllTasks } from "../../../../hooks/tasks.hooks";
import { Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { BreadCrumbsComp } from "../../../../features/BreadCrumbs";
import { useDataGrid } from "../../../../hooks/datagrid.hooks";
import PageLayout from "../../../../layouts/PageLayout";
import { Task } from "../../../../types/task.types";
import { getTasksCol } from "../../../../utils/tasks.utils";
import { en } from "../../../../constants/labels";
import { ROUTES } from "../../../../constants/routes";
import DataGrid from "../../../../components/DataGrid/DataGridMain.component";
import { FilterMap } from "../../../../types/common.types";
import { useRouter } from "next/router";
import { ExpandedDataGridCell } from "../../../../features/ExpandedTaskRow";

const CreateNewTask = () => {
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
                { label: en.createTask, url: ROUTES.createTask },
              ]}
            />
            <Typography mx={3} color="#0B1246" variant="h6">
              {en.createNewTask}
            </Typography>
          </Box>
        </Box>
        <Divider sx={{ my: 0 }} />
        <Box
          sx={{ boxShadow: 25 }}
          m={4}
          borderRadius="13px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          bgcolor="#E7EBF0"
        ></Box>
      </Box>
    </PageLayout>
  );
};

export default CreateNewTask;
