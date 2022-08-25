import { Divider, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { BreadCrumbsComp } from "../../../../features/BreadCrumbs";
import PageLayout from "../../../../layouts/PageLayout";
import { en } from "../../../../constants/labels";
import { ROUTES } from "../../../../constants/routes";
import {
  CommDateSelect,
  CommFormInput,
  CommSelectInput,
} from "../../../../features/CommTaskInputs";
import { Button } from "../../../../components/Button";
import { useGetLocalStorage } from "../../../../hooks/auth.hooks";
import { useCallback, useState } from "react";
import { useGetTaskTypes, usePostTask } from "../../../../hooks/tasks.hooks";
import { useGetClients } from "../../../../hooks/clients.hooks";
import { id } from "date-fns/locale";
import { useGetAllUsersInfo } from "../../../../hooks/user.hooks";
import { palette } from "../../../../styles/theme";
import { Select } from "../../../../types/common.types";
import { taskParentTypes } from "../../../../constants/clients.constants";
import { useGetAllOptions } from "../../../../hooks/utilities.hooks";

const CreateNewTask = () => {
  const { fullName, email } = useGetLocalStorage();
  const [formValues, setFormValues] = useState<{
    startDate: Date | null;
    endDate: Date | null;
    name: string;
    type: string | null;
    client: string | null;
    entity: string | null;
    assignee: string | null;
    comments: string;
    totalAmount: number | null;
    paidAmount: number | null;
    balanceAmount: number | null;
  }>({
    startDate: new Date(),
    endDate: new Date(new Date().setDate(new Date().getDate() + 2)),
    name: "",
    type: "",
    client: "",
    entity: "",
    assignee: "",
    comments: "",
    totalAmount: 0,
    paidAmount: 0,
    balanceAmount: 0,
  });

  const { data: allOptions, isLoading: optionsIsLoading } = useGetAllOptions();
  const { mutate: createTask, isLoading: taskIsCreating } = usePostTask();

  const getEntityOptions = useCallback(
    (clientId: string | null) => {
      return (allOptions?.clients || []).find(({ id }) => `${id}` === clientId)
        ?.entities;
    },
    [allOptions?.clients, formValues.client]
  );

  const handleCreateTask = () => {
    const payload = {
      data: {
        ...(formValues.startDate && { startDate: formValues.startDate }),
        ...(formValues.endDate && { endDate: formValues.endDate }),
        ...(formValues.name && { name: formValues.name }),
        ...(formValues.type && { type: formValues.type }),
        ...(formValues.client && { client: formValues.client }),
        ...(formValues.entity && { entity: formValues.entity }),
        ...(formValues.assignee && { assignee: formValues.assignee }),
        ...(formValues.comments && { comments: formValues.comments }),
        totalAmount: formValues.totalAmount as number,
        paidAmount: formValues.paidAmount as number,
      },
    };
    createTask({ payload });
  };

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
                { label: en.createTask, url: ROUTES.createTask },
              ]}
            />
            <Typography mx={3} variant="h6">
              {en.createNewTask}
            </Typography>
          </Box>
        </Box>
        <Divider sx={{ my: 0 }} />
        <Box p={5}>
          <Box
            p={4}
            bgcolor={palette.primary.white}
            borderRadius="15px"
            border={`${palette.primary.main} 1.5px solid`}
          >
            <Grid container direction="row">
              <Box px={2} width="25%">
                <Grid
                  container
                  direction="column"
                  alignItems="center"
                  justifyContent="end"
                  gap={2}
                >
                  <Box width="100%">
                    <CommFormInput
                      value={fullName}
                      label={en.creator} //"Creator Name"
                      readOnly
                      required
                    />
                  </Box>
                  <Box width="100%">
                    <CommDateSelect
                      label={en.startDate} //"Start Date"
                      handleChange={(startDate) =>
                        setFormValues({
                          ...formValues,
                          startDate,
                        })
                      }
                      value={
                        formValues.startDate
                          ? new Date(formValues.startDate)
                          : ""
                      }
                      showCancleIcon
                      required
                    />
                  </Box>
                  <Box width="100%">
                    <CommFormInput
                      value={formValues.name}
                      label={en.taskName} //"Task Name"
                      handleChange={(name) =>
                        setFormValues({ ...formValues, name: name as string })
                      }
                      required
                    />
                  </Box>
                  <Box width="100%">
                    <CommSelectInput
                      value={formValues.client}
                      label={en.client} //"Client"
                      handleChange={(client) =>
                        setFormValues({
                          ...formValues,
                          client: client as string,
                          entity: "",
                        })
                      }
                      options={(allOptions?.clients || []).map(
                        ({ id, name }) => ({
                          value: id,
                          label: name,
                        })
                      )}
                      isLoading={optionsIsLoading}
                      isSearchable
                    />
                  </Box>
                  <Box width="100%">
                    <CommSelectInput
                      value={formValues.assignee}
                      label={en.assignee} //"Assignee"
                      handleChange={(assignee) =>
                        setFormValues({
                          ...formValues,
                          assignee: assignee as string,
                        })
                      }
                      options={(allOptions?.users || []).map(
                        ({ fName, role, id }) => ({
                          value: id,
                          label: `${fName} - ${
                            role[0].toUpperCase() +
                            role.toLowerCase().slice(1, role.length)
                          }`,
                        })
                      )}
                      required
                      isSearchable
                      isLoading={optionsIsLoading}
                    />
                  </Box>
                </Grid>
              </Box>
              <Box px={2} width="25%">
                <Grid
                  container
                  direction="column"
                  alignItems="center"
                  justifyContent="end"
                  gap={2}
                >
                  <Box width="100%">
                    <CommFormInput
                      value={email}
                      label={en.creatorEmail} // Creator Email
                      handleChange={() => {}}
                      readOnly
                      required
                    />
                  </Box>
                  <Box width="100%">
                    <CommDateSelect
                      label={en.endDate} // End Date
                      handleChange={(endDate) =>
                        setFormValues({
                          ...formValues,
                          endDate,
                        })
                      }
                      value={
                        formValues.endDate ? new Date(formValues.endDate) : ""
                      }
                      showCancleIcon
                      minDate={formValues.startDate as Date}
                      readOnly={!Boolean(formValues.startDate)}
                    />
                  </Box>
                  <Box width="100%">
                    <CommSelectInput
                      label={en.taskType} // Task Type
                      value={formValues.type}
                      handleChange={(type, label) => {
                        setFormValues({
                          ...formValues,
                          type: type as string,
                        });
                      }}
                      options={
                        (allOptions?.taskTypes || [])?.map(
                          ({ id, childName: name, parentId }, index) => ({
                            label: name,
                            value: id,
                            groupByValue:
                              taskParentTypes[
                                parentId as keyof typeof taskParentTypes
                              ].label,
                          })
                        ) as Select[]
                      }
                      isLoading={optionsIsLoading}
                      required
                      isSearchable
                      groupBy={(option) => option.groupByValue as string}
                    />
                  </Box>
                  <Box width="100%">
                    <CommSelectInput // Entity
                      label={en.entity}
                      value={formValues.entity}
                      handleChange={(entity) =>
                        setFormValues({
                          ...formValues,
                          entity: entity as string,
                        })
                      }
                      readOnly={!Boolean(formValues.client)}
                      options={getEntityOptions(formValues.client) || []}
                      isLoading={optionsIsLoading}
                    />
                  </Box>
                  <Box width="100%">
                    <CommFormInput
                      label={en.comments} // Comments
                      value={formValues.comments}
                      handleChange={(comments) =>
                        setFormValues({
                          ...formValues,
                          comments: comments as string,
                        })
                      }
                      rows={4}
                    />
                  </Box>
                </Grid>
              </Box>
              <Box px={2} width="25%">
                <Grid
                  container
                  direction="column"
                  alignItems="center"
                  justifyContent="end"
                  gap={2}
                >
                  <Box width="100%">
                    <CommFormInput
                      type="number"
                      label={en.totalAmount}
                      value={formValues.totalAmount as number}
                      handleChange={(totalAmount) =>
                        setFormValues({
                          ...formValues,
                          totalAmount: Number(totalAmount),
                        })
                      }
                    />
                  </Box>
                  <Box width="100%">
                    <CommFormInput
                      type="number"
                      label={en.paidAmount}
                      value={formValues.paidAmount as number}
                      handleChange={(paidAmount) =>
                        setFormValues({
                          ...formValues,
                          paidAmount: Number(paidAmount),
                        })
                      }
                    />
                  </Box>
                  <Box width="100%">
                    <CommFormInput
                      type="number"
                      label={en.balanceAmount}
                      value={
                        !isNaN(formValues.totalAmount as number) &&
                        !isNaN(formValues.paidAmount as number)
                          ? (formValues.totalAmount as number) -
                            (formValues.paidAmount as number)
                          : 0
                      }
                      handleChange={() => {}}
                      readOnly
                    />
                  </Box>
                </Grid>
              </Box>
              <Box width="25%">
                <Grid
                  container
                  direction="column"
                  justifyContent="end"
                  alignItems="center"
                  height="100%"
                >
                  {/* <Typography>
                    {JSON.stringify(formValues, null, "  ")}
                  </Typography> */}
                  <Button
                    onClick={handleCreateTask}
                    variant="contained"
                    color="success"
                    label={en.createTask}
                    isLoading={taskIsCreating}
                    sx={{
                      fontSize: "16px",
                      textTransform: "none",
                    }}
                  />
                </Grid>
              </Box>
            </Grid>
          </Box>
        </Box>
      </Box>
    </PageLayout>
  );
};

export default CreateNewTask;
