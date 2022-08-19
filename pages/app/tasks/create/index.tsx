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

const CreateNewTask = () => {
  const { fullName, email } = useGetLocalStorage();
  const [formValues, setFormValues] = useState<{
    startDate: Date | null;
    endDate: Date | null;
    name: string;
    type: string;
    client: string;
    entity: string;
    assignee: string;
    comments: string;
    totalAmount: string;
    paidAmount: string;
    balanceAmount: string;
  }>({
    startDate: new Date(),
    endDate: new Date(new Date().setDate(new Date().getDate() + 2)),
    name: "",
    type: "",
    client: "",
    entity: "",
    assignee: "",
    comments: "",
    totalAmount: "",
    paidAmount: "",
    balanceAmount: "",
  });
  const { data: taskTypes, isLoading: taskTypesIsLoading } = useGetTaskTypes();
  const { data: clients, isLoading: clientsInfoIsLoading } = useGetClients();
  const { data: users, isLoading: usersInfoIsLoading } = useGetAllUsersInfo();
  const { mutate: createTask, isLoading: taskIsCreating } = usePostTask();

  const getEntityOptions = useCallback(
    (clientId: string) => {
      return (clients || []).find(({ id }) => id === clientId)?.entities;
    },
    [clients, formValues.client]
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
        ...(formValues.totalAmount && { totalAmount: formValues.totalAmount }),
        ...(formValues.paidAmount && { paidAmount: formValues.paidAmount }),
        ...(formValues.balanceAmount && {
          balanceAmount: formValues.balanceAmount,
        }),
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
            border={`${palette.secondary.light} 1.5px solid`}
            boxShadow={3}
          >
            <Grid container direction="row">
              <Box width="25%">
                <Grid
                  container
                  direction="column"
                  justifyContent="flex-start"
                  alignItems="center"
                  gap={2}
                >
                  <CommFormInput
                    value={fullName}
                    label={en.creator} //"Creator"
                    handleChange={() => {}}
                    readOnly
                    required
                    sx={{ width: 250 }}
                  />
                  <CommDateSelect
                    label={en.startDate} //"Start Date"
                    handleChange={(startDate) =>
                      setFormValues({
                        ...formValues,
                        startDate,
                      })
                    }
                    value={
                      formValues.startDate ? new Date(formValues.startDate) : ""
                    }
                    sx={{ width: 250 }}
                    showCancleIcon
                    required
                  />
                  <CommFormInput
                    value={formValues.name}
                    label={en.taskName} //"Task Name"
                    handleChange={(name) =>
                      setFormValues({ ...formValues, name })
                    }
                    sx={{ width: 250 }}
                    required
                  />
                  <CommSelectInput
                    value={formValues.client}
                    label={en.client} //"Client"
                    handleChange={(client) =>
                      setFormValues({ ...formValues, client, entity: "" })
                    }
                    options={(clients || []).map(({ id, name }) => ({
                      value: id,
                      label: name,
                    }))}
                    isLoading={clientsInfoIsLoading}
                  />
                  <CommSelectInput
                    value={formValues.assignee}
                    label={en.assignee} //"Assignee"
                    handleChange={(assignee) =>
                      setFormValues({ ...formValues, assignee })
                    }
                    options={(users || []).map(({ fName, role, id }) => ({
                      value: id,
                      label: `${fName} - ${role}`,
                    }))}
                    required
                    isLoading={usersInfoIsLoading}
                  />
                </Grid>
              </Box>
              <Box width="25%">
                <Grid
                  container
                  direction="column"
                  alignItems="center"
                  justifyContent="flex-start"
                  gap={2}
                >
                  <CommFormInput
                    value={email}
                    label={en.creatorEmail} // Creator Email
                    handleChange={() => {}}
                    sx={{ width: 250 }}
                    readOnly
                    required
                  />
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
                    sx={{ width: 250 }}
                    minDate={formValues.startDate as Date}
                    readOnly={!Boolean(formValues.startDate)}
                  />
                  <CommSelectInput
                    label={en.taskType} // Task Type
                    value={formValues.type}
                    handleChange={(type) =>
                      setFormValues({
                        ...formValues,
                        type,
                      })
                    }
                    options={(taskTypes || [])?.map(({ id, name }) => ({
                      label: name,
                      value: id,
                    }))}
                    isLoading={taskTypesIsLoading}
                    required
                  />
                  <CommSelectInput
                    label={en.entity} // Entity
                    value={formValues.entity}
                    handleChange={(entity) =>
                      setFormValues({
                        ...formValues,
                        entity,
                      })
                    }
                    readOnly={!Boolean(formValues.client)}
                    options={getEntityOptions(formValues.client) || []}
                    isLoading={clientsInfoIsLoading}
                  />
                  <CommFormInput
                    label={en.comments} // Comments
                    value={formValues.comments}
                    handleChange={(comments) =>
                      setFormValues({
                        ...formValues,
                        comments,
                      })
                    }
                    sx={{ width: 250 }}
                  />
                </Grid>
              </Box>
              <Box width="25%">
                <Grid
                  container
                  direction="column"
                  alignItems="center"
                  justifyContent="flex-start"
                  gap={2}
                >
                  <CommFormInput
                    label="Total Amount"
                    value={formValues.totalAmount}
                    handleChange={(totalAmount) =>
                      setFormValues({ ...formValues, totalAmount })
                    }
                    sx={{ width: 250 }}
                  />
                  <CommFormInput
                    label="Paid Amount"
                    value={formValues.paidAmount}
                    handleChange={(paidAmount) =>
                      setFormValues({ ...formValues, paidAmount })
                    }
                    sx={{ width: 250 }}
                  />
                  <CommFormInput
                    label="Balance Amount"
                    value={formValues.balanceAmount}
                    handleChange={(balanceAmount) =>
                      setFormValues({ ...formValues, balanceAmount })
                    }
                    sx={{ width: 250 }}
                  />
                </Grid>
              </Box>
              <Box width="25%">
                <Grid
                  container
                  direction="column"
                  justifyContent="flex-end"
                  alignItems="center"
                >
                  <Button
                    onClick={handleCreateTask}
                    variant="contained"
                    color="success"
                    label="Create Task"
                    isLoading={taskIsCreating}
                    sx={{
                      fontSize: "16px",
                      textTransform: "none",
                    }}
                  />
                  {/* <Typography>
                    {JSON.stringify(formValues, null, "\t")}
                  </Typography> */}
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
