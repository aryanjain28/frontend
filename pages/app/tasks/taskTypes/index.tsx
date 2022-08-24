import {
  Box,
  CircularProgress,
  Divider,
  Fade,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
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
import { CustomTooltip } from "../../../../features/CustomTooltip";
import { taskParentTypes } from "../../../../constants/clients.constants";
import { Select } from "../../../../types/common.types";
import {
  useGetTaskTypes,
  usePostTaskTypes,
} from "../../../../hooks/tasks.hooks";
import { Loader } from "../../../../components/Loader";

const borderRight = `1px ${palette.neutral.tint} solid`;

const DataCell = ({ value }: { value: string }) => (
  <TableCell sx={{ borderRight }}>
    <Box display="flex">
      <CustomTooltip title={value}>
        <Typography maxWidth={150} noWrap>
          {value}
        </Typography>
      </CustomTooltip>
    </Box>
  </TableCell>
);

const TaskTypes = () => {
  const [taskType, setTaskType] = useState<number>(1);
  const [taskSubtype, setTaskSubtype] = useState<string>("");

  const { data: allTaskTypes, isLoading } = useGetTaskTypes();
  const { mutate, isLoading: isSaving } = usePostTaskTypes();

  let currentId = -1;
  let final: any = [];
  let arrIndex = 0;
  let temp: any = {};
  (allTaskTypes || []).forEach(({ parentId, childName }, index) => {
    arrIndex = currentId === parentId && index ? arrIndex + 1 : 0;
    temp = final[arrIndex] || {};
    temp[`${taskParentTypes[parentId as keyof typeof taskParentTypes].key}`] =
      childName;
    final[arrIndex] = temp;
    currentId = parentId;
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
          <Box my={2} width="70%" sx={{ boxShadow: 3, borderRadius: 3 }}>
            <TableContainer sx={{ height: "100%", borderRadius: 3 }}>
              <Table size="small" stickyHeader>
                <TableHead>
                  <TableRow sx={{ background: palette.primary.black }}>
                    {Object.values(taskParentTypes).map(({ label: column }) => (
                      <TableCell
                        sx={{
                          background: palette.primary.main,
                          color: palette.primary.white,
                        }}
                      >
                        {column}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell
                        sx={{ p: 0 }}
                        colSpan={Object.keys(taskParentTypes).length}
                      >
                        <Box
                          height={300}
                          width="100%"
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background: palette.primary.white,
                          }}
                        >
                          <Loader />
                        </Box>
                      </TableCell>
                    </TableRow>
                  ) : final.length < 1 ? (
                    <TableRow>
                      <TableCell
                        sx={{ p: 0 }}
                        colSpan={Object.keys(taskParentTypes).length}
                      >
                        <Box
                          height={300}
                          width="100%"
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background: palette.primary.white,
                          }}
                        >
                          <Typography letterSpacing={2}>
                            {en.wowSoEmpty}
                          </Typography>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ) : (
                    final.map(
                      (
                        {
                          gst,
                          it,
                          tally,
                          reports,
                          registrations,
                          others,
                        }: {
                          gst: string;
                          it: string;
                          tally: string;
                          reports: string;
                          registrations: string;
                          others: string;
                        },
                        index: number
                      ) => (
                        <TableRow
                          key={`${index}_${gst}`}
                          sx={{ background: palette.primary.white }}
                        >
                          <DataCell value={gst || ""} />
                          <DataCell value={it || ""} />
                          <DataCell value={tally || ""} />
                          <DataCell value={reports || ""} />
                          <DataCell value={registrations || ""} />
                          <DataCell value={others || ""} />
                        </TableRow>
                      )
                    )
                  )}
                </TableBody>
              </Table>
            </TableContainer>
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
