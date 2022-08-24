import {
  Box,
  Collapse,
  Grid,
  MenuProps,
  Popover,
  TableCell,
  Typography,
} from "@mui/material";
import { Row } from "../types/datagrid.types";
import { taskStatus } from "../utils/tasks.utils";
import { Button } from "../components/Button";
import { useCallback, useEffect, useState } from "react";
import { isAdmin, isStaff } from "../utils/common.utils";
import RupeeIcon from "@mui/icons-material/CurrencyRupeeOutlined";
import ThreeDotsIcon from "@mui/icons-material/MoreVert";
import { en } from "../constants/labels";
import { useDeleteTask, usePatchTask } from "../hooks/tasks.hooks";
import ConfimationModal from "../components/Modal";
import moment from "moment";
import {
  CommDateSelect,
  CommFormInput,
  CommSelectInput,
} from "./CommTaskInputs";
import { useRouter } from "next/router";
import { ROUTES } from "../constants/routes";
import { useGetLocalStorage } from "../hooks/auth.hooks";
import { palette } from "../styles/theme";
import { Select } from "../types/common.types";
import { useGetAllOptions } from "../hooks/utilities.hooks";

const ExpandedTaskGridCell = ({
  row = {},
  open,
  colSpan,
}: {
  row: Row;
  open: boolean;
  colSpan: number;
}) => {
  const router = useRouter();
  const isMyTask = router.pathname.includes(ROUTES.myTasks);
  const { userId } = useGetLocalStorage();

  console.log(row);

  const [formValues, setFormValues] = useState<any>(row);
  useEffect(() => {
    setFormValues({ ...row });
  }, [row.id]);

  const { data: allOptions, isLoading: optionsIsLoading } = useGetAllOptions();

  const getEntityOptions = useCallback(
    (clientId: string | number) => {
      return (allOptions?.clients || []).find(({ id }) => id === clientId)
        ?.entities;
    },
    [allOptions?.clients, formValues.client]
  );

  const [anchorEl, setAnchorEl] = useState<MenuProps["anchorEl"] | null>(null);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const { mutate: updateTask, isLoading: isUpdating } = usePatchTask(isMyTask);
  const { mutate: deleteTask, isLoading: isDeleting } = useDeleteTask(
    userId as string
  );

  return (
    <>
      <TableCell sx={{ p: 0 }} colSpan={colSpan}>
        <Collapse in={open} unmountOnExit>
          <Box
            border="1px solid"
            borderColor={palette.primary.light}
            sx={{ background: palette.primary.light }}
          >
            <Box m={2} sx={{ boxShadow: 3 }}>
              <Grid
                container
                direction="row"
                alignItems="start"
                justifyContent="end"
                xs={12}
              >
                <Grid direction="column" xs={8}>
                  <Box p={0} bgcolor={palette.neutral.tint}>
                    <Box sx={{ flexGrow: 1 }} px={2}>
                      <Grid container>
                        <Grid container item spacing={3}>
                          <Grid item xs={3}>
                            <Box py={1} height="100%">
                              <CommFormInput
                                key="createdByName"
                                label={"Created By"} // Created By
                                value={formValues.createdByName}
                                handleChange={(v) =>
                                  setFormValues({
                                    ...formValues,
                                    createdByName: v,
                                  })
                                }
                                readOnly
                              />
                            </Box>
                          </Grid>
                          <Grid item xs={3}>
                            <Box py={1} height="100%">
                              <CommFormInput
                                key="createdByEmail"
                                label={"Creator's Email"}
                                value={formValues.createdByEmail}
                                handleChange={(v) =>
                                  setFormValues({
                                    ...formValues,
                                    createdByEmail: v,
                                  })
                                }
                                readOnly
                              />
                            </Box>
                          </Grid>
                          <Grid item xs={3}>
                            <Box py={1} height="100%">
                              <CommDateSelect
                                key="startDate"
                                label={"Start Date"}
                                value={new Date(formValues.startDate)}
                                handleChange={(v) =>
                                  setFormValues({ ...formValues, startDate: v })
                                }
                                readOnly={isStaff()}
                              />
                            </Box>
                          </Grid>
                          <Grid item xs={3}>
                            <Box py={1} height="100%">
                              <CommDateSelect
                                key="endDate"
                                label={"End Date"}
                                value={
                                  formValues.endDate
                                    ? new Date(formValues.endDate)
                                    : ""
                                }
                                handleChange={(v) =>
                                  setFormValues({ ...formValues, endDate: v })
                                }
                                showCancleIcon
                                readOnly={isStaff()}
                              />
                            </Box>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Box>
                    <Box sx={{ flexGrow: 1 }} px={2}>
                      <Grid container spacing={1}>
                        <Grid container item spacing={3}>
                          <Grid item xs={4}>
                            <Box py={1} height="100%">
                              <CommFormInput
                                key="name"
                                label={"Name"}
                                value={formValues.name}
                                handleChange={(v) =>
                                  setFormValues({ ...formValues, name: v })
                                }
                                readOnly={isStaff()}
                              />
                            </Box>
                          </Grid>
                          <Grid item xs={4}>
                            <Box py={1} height="100%">
                              <CommSelectInput
                                label="Task Type" // Task Type
                                value={formValues.taskTypeId}
                                handleChange={(value, label) => {
                                  setFormValues({
                                    ...formValues,
                                    taskTypeId: value,
                                    taskTypeName: label,
                                  });
                                }}
                                options={(allOptions?.taskTypes || [])?.map(
                                  ({ id, childName }) => ({
                                    label: childName,
                                    value: id,
                                  })
                                )}
                                readOnly={isStaff()}
                                isLoading={optionsIsLoading}
                              />
                            </Box>
                          </Grid>
                          <Grid item xs={4}>
                            <Box py={1} height="100%">
                              <CommSelectInput
                                label="Status"
                                value={formValues.status}
                                handleChange={(p) =>
                                  setFormValues({ ...formValues, status: p })
                                }
                                options={Object.keys(taskStatus)}
                              />
                            </Box>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Box>
                    <Box sx={{ flexGrow: 1 }} px={2}>
                      <Grid container spacing={1}>
                        <Grid container item spacing={3}>
                          <Grid item xs={4}>
                            <Box py={1} height="100%">
                              <CommSelectInput
                                label="Client Name"
                                value={formValues.clientId}
                                handleChange={(v, l) =>
                                  setFormValues({
                                    ...formValues,
                                    clientId: v,
                                    clientName: l,
                                    clientEntity: "",
                                  })
                                }
                                options={
                                  (allOptions?.clients || []).map(
                                    ({ id, name }) => ({
                                      value: id,
                                      label: name,
                                    })
                                  ) as Select[]
                                }
                                isLoading={optionsIsLoading}
                              />
                            </Box>
                          </Grid>
                          <Grid item xs={4}>
                            <Box py={1} height="100%">
                              <CommSelectInput
                                label={"Client Entity"}
                                value={formValues.clientEntity}
                                handleChange={(p) =>
                                  setFormValues({
                                    ...formValues,
                                    clientEntity: p,
                                  })
                                }
                                options={
                                  getEntityOptions(formValues.clientId) || []
                                }
                                readOnly={!Boolean(formValues.clientName)}
                              />
                            </Box>
                          </Grid>
                          <Grid item xs={4}>
                            <Box py={1} height="100%">
                              <CommSelectInput
                                label="Assignee"
                                value={formValues.assigneeId}
                                handleChange={(value, label) =>
                                  setFormValues({
                                    ...formValues,
                                    assigneeId: value,
                                    assigneeFName: label,
                                  })
                                }
                                options={(allOptions?.users || []).map(
                                  ({ fName, role, id }) => ({
                                    value: id,
                                    label: `${fName} - ${role}`,
                                  })
                                )}
                                readOnly={isStaff()}
                                isLoading={optionsIsLoading}
                              />
                            </Box>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Box>
                  </Box>
                </Grid>
                <Grid direction="column" xs={2}>
                  <Box
                    p={0}
                    bgcolor={palette.neutral.tint}
                    borderLeft={`${palette.secondary.light} 1px solid`}
                    borderRight={`${palette.secondary.light} 1px solid`}
                  >
                    {[
                      {
                        key: "totalAmount",
                        label: "Total",
                        value: formValues.totalAmount,
                        readOnly: false,
                      },
                      {
                        key: "paidAmount",
                        label: "Paid",
                        value: formValues.paidAmount,
                        readOnly: false,
                      },
                      {
                        key: "balanceAmount",
                        label: "Balance",
                        value: formValues.totalAmount - formValues.paidAmount,
                        readOnly: true,
                      },
                    ].map(({ key, label, value, readOnly }) => (
                      <Box sx={{ flexGrow: 1 }} px={2} py={1}>
                        <CommFormInput
                          key={key}
                          label={label}
                          value={value}
                          handleChange={(v) =>
                            setFormValues({ ...formValues, [key]: v })
                          }
                          icon={<RupeeIcon sx={{ fontSize: "16px", mx: 0 }} />}
                          readOnly={readOnly}
                        />
                      </Box>
                    ))}
                  </Box>
                </Grid>
                <Grid direction="column" xs={2}>
                  <Box p={0} bgcolor={palette.neutral.tint}>
                    <Box sx={{ flexGrow: 1 }} px={2} py={1}>
                      <CommFormInput
                        label="Comments"
                        value={formValues.comments}
                        handleChange={(v) =>
                          setFormValues({ ...formValues, comments: v })
                        }
                        rows={4}
                        readOnly={isStaff()}
                      />
                    </Box>
                    <Box sx={{ flexGrow: 1 }} px={2} py={1.6}>
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Grid
                          container
                          width="100%"
                          direction="column"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <Button
                            label="Update"
                            variant="contained"
                            onClick={() => {
                              updateTask({ payload: { data: formValues } });
                            }}
                            fullWidth
                            isLoading={isUpdating}
                          />
                          <Typography
                            fontSize="12px"
                            sx={{ fontStyle: "oblique" }}
                          >
                            Updated{" "}
                            {moment(formValues.updatedAt, "YYYYMMDD").fromNow()}
                          </Typography>
                        </Grid>
                        {isAdmin() && (
                          <ThreeDotsIcon
                            sx={{ mb: 2, ml: 1, cursor: "pointer" }}
                            onClick={(e) => setAnchorEl(e.currentTarget)}
                          />
                        )}
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Collapse>
      </TableCell>

      <Popover
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        onClick={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "right",
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          py={2}
          px={6}
        >
          <Button
            label={en.delete}
            variant="contained"
            color="error"
            isLoading={isDeleting}
            onClick={() => setOpenConfirmModal(true)}
          />
        </Box>
      </Popover>

      <ConfimationModal
        open={openConfirmModal}
        setOpen={(p) => setOpenConfirmModal(p)}
        handleClick={() => deleteTask({ taskId: formValues.id })}
        isLoading={isDeleting}
      />
    </>
  );
};

export default ExpandedTaskGridCell;
