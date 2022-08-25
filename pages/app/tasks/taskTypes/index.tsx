import { Box, Divider, Grid, Typography } from "@mui/material";
import { Button } from "../../../../components/Button";
import { en } from "../../../../constants/labels";
import { ROUTES } from "../../../../constants/routes";
import { BreadCrumbsComp } from "../../../../features/BreadCrumbs";
import {
  CommFormInput,
  CommSelectInput,
} from "../../../../features/CommTaskInputs";
import PageLayout from "../../../../layouts/PageLayout";
import { palette } from "../../../../styles/theme";
import { useState } from "react";
import { taskParentTypes } from "../../../../constants/clients.constants";
import { Select } from "../../../../types/common.types";
import {
  useGetTaskTypes,
  usePostTaskTypes,
} from "../../../../hooks/tasks.hooks";
import { ViewTable } from "../../../../features/ViewTable";
import { getTableData } from "../../../../utils/taskTypes.utils";

const TaskTypes = () => {
  const [taskType, setTaskType] = useState<number>(1);
  const [taskSubtype, setTaskSubtype] = useState<string>("");

  const { data: allTaskTypes, isLoading } = useGetTaskTypes();
  const { mutate, isLoading: isSaving } = usePostTaskTypes();

  const myObj = {
    gst: "",
    it: "",
    tally: "",
    reports: "",
    registrations: "",
    others: "",
  };

  const data = getTableData(allTaskTypes || []);

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
                { label: en.myTasks, url: ROUTES.taskTypes },
              ]}
            />
            <Typography mx={3} variant="h6">
              {en.taskTypes}
            </Typography>
          </Box>
        </Box>
        <Divider sx={{ my: 0 }} />
        <Box
          width="100%"
          display="flex"
          alignItems="center"
          justifyContent="space-evenly"
          sx={{ background: palette.primary.light }}
          py={5}
        >
          <Box
            my={2}
            width="70%"
            sx={{ background: "white", boxShadow: 3, borderRadius: 3 }}
          >
            <ViewTable
              data={(data || []).map((p: object) => ({ ...myObj, ...p }))}
              columns={Object.values(taskParentTypes).map((_) => _.label)}
              isLoading={isLoading}
              colSpan={Object.keys(taskParentTypes).length}
            />
          </Box>
          <Box width="20%">
            <Grid
              container
              direction="column"
              border="2px white solid"
              sx={{ background: "white", boxShadow: 3 }}
              borderRadius={3}
              p={3}
            >
              <Typography letterSpacing={2} fontSize={13}>
                {en.createNewTaskType}
              </Typography>
              <Box width="100%" my={4}>
                <CommSelectInput
                  label={en.taskType} // Task Type
                  value={taskType}
                  handleChange={(type) => {
                    setTaskType(Number(type));
                    setTaskSubtype("");
                  }}
                  options={
                    (Object.entries(taskParentTypes) || [])?.map(
                      ([parentId, { label }]) => ({
                        label,
                        value: parentId,
                      })
                    ) as Select[]
                  }
                  required
                />
                <CommFormInput
                  label={en.taskSubtype} // Task Type
                  value={taskSubtype}
                  handleChange={(value) => setTaskSubtype(value as string)}
                  required
                  readOnly={!Boolean(taskType)}
                />
              </Box>
              <Button
                sx={{
                  background: palette.primary.success,
                  textTransform: "none",
                  fontSize: 15,
                }}
                label={en.addTaskType}
                variant="contained"
                onClick={() =>
                  mutate({
                    payload: {
                      data: { parentId: taskType, childName: taskSubtype },
                    },
                  })
                }
                isLoading={isSaving}
                disabled={!Boolean(taskType) || !Boolean(taskSubtype)}
              />
            </Grid>
          </Box>
        </Box>
      </Box>
    </PageLayout>
  );
};

export default TaskTypes;
