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
import { useState } from "react";

const CreateNewTask = () => {
  const { fullName } = useGetLocalStorage();
  const [formValues, setFormValues] = useState({
    startDate: "",
    endDate: "",
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
        <Box
          bgcolor="#f0f5fa"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
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
        <Box p={5} bgcolor="#194163">
          <Box p={4} bgcolor="white" borderRadius="15px">
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
                    label="Creator"
                    handleChange={() => {}}
                    readOnly
                    required
                    sx={{ width: 250 }}
                  />
                  <CommDateSelect
                    label="Start Date"
                    handleChange={(date) =>
                      setFormValues({
                        ...formValues,
                        startDate: date.toString(),
                      })
                    }
                    value={new Date(formValues.startDate)}
                    sx={{ width: 250 }}
                    showCancleIcon
                    required
                  />
                  <CommFormInput
                    value={formValues.name}
                    label="Task Name"
                    handleChange={(name) =>
                      setFormValues({ ...formValues, name })
                    }
                    sx={{ width: 250 }}
                    required
                  />
                  <CommSelectInput
                    value={formValues.client}
                    label="Client"
                    handleChange={(client) =>
                      setFormValues({ ...formValues, client })
                    }
                    options={[]}
                  />
                  <CommSelectInput
                    value={formValues.assignee}
                    label="Assignee"
                    handleChange={(assignee) =>
                      setFormValues({ ...formValues, assignee })
                    }
                    options={[]}
                    required
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
                    value={""}
                    label="Creator Email"
                    handleChange={() => {}}
                    sx={{ width: 250 }}
                    readOnly
                    required
                  />
                  <CommDateSelect
                    label="End Date"
                    handleChange={(p) =>
                      setFormValues({
                        ...formValues,
                        endDate: p.toString(),
                      })
                    }
                    value={new Date(formValues.endDate)}
                    showCancleIcon
                    sx={{ width: 250 }}
                  />
                  <CommSelectInput
                    label="Task Type"
                    value={formValues.type}
                    handleChange={(type) =>
                      setFormValues({
                        ...formValues,
                        type,
                      })
                    }
                    options={[]}
                    required
                  />
                  <CommSelectInput
                    label="Entity"
                    value={formValues.entity}
                    handleChange={(entity) =>
                      setFormValues({
                        ...formValues,
                        entity,
                      })
                    }
                    options={[]}
                  />
                  <CommFormInput
                    label="Comments"
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
                    onClick={() => {}}
                    variant="contained"
                    color="success"
                    label="Create Task"
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
