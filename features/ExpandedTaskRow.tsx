import {
  Box,
  Checkbox,
  Collapse,
  FormControlLabel,
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
import {
  useDeleteTask,
  useGetTaskTypes,
  usePatchTask,
} from "../hooks/tasks.hooks";
import ConfimationModal from "../components/Modal";
import moment from "moment";
import {
  CommDateSelect,
  CommFormInput,
  CommSelectInput,
} from "./CommTaskInputs";
import { useGetClients } from "../hooks/clients.hooks";
import { useGetAllUsersInfo } from "../hooks/user.hooks";

export const ExpandedDataGridCell = ({
  row = {},
  open,
  colSpan,
}: {
  row: Row;
  open: boolean;
  colSpan: number;
}) => {
  const [formValues, setFormValues] = useState<any>(row);
  useEffect(() => {
    setFormValues({ ...row });
  }, [row.id]);

  console.log(formValues);

  const { data: taskTypes, isLoading: taskTypesIsLoading } = useGetTaskTypes();
  const { data: clients, isLoading: clientsInfoIsLoading } = useGetClients();
  const { data: users, isLoading: usersInfoIsLoading } = useGetAllUsersInfo();

  const getEntityOptions = useCallback(
    (clientId: string) => {
      return (clients || []).find(({ id }) => id === clientId)?.entities;
    },
    [clients, formValues.client]
  );

  const [anchorEl, setAnchorEl] = useState<MenuProps["anchorEl"] | null>(null);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const { mutate: updateTask, isLoading: isUpdating } = usePatchTask();
  const { mutate: deleteTask, isLoading: isDeleting } = useDeleteTask();

  console.log("formValues: ", formValues);

  return (
    <>
      <TableCell sx={{ p: 0 }} colSpan={colSpan}>
        <Collapse in={open} unmountOnExit>
          <Box p={1} bgcolor="#E7EBF0" borderRadius="5px">
            <Grid
              container
              direction="row"
              alignItems="end"
              justifyContent="end"
              xs={12}
            >
              <Grid direction="column" xs={8}>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-around"
                  p={1}
                  gap={1}
                >
                  <CommFormInput
                    key="createdByName"
                    label={"Created By"}
                    value={formValues.createdByName}
                    handleChange={(v) =>
                      setFormValues({ ...formValues, createdByName: v })
                    }
                    readOnly
                    sx={{ width: 230 }}
                  />
                  <CommFormInput
                    key="createdByEmail"
                    label={"Creator's Email"}
                    value={formValues.createdByEmail}
                    handleChange={(v) =>
                      setFormValues({ ...formValues, createdByEmail: v })
                    }
                    readOnly
                    sx={{ width: 250 }}
                  />
                  <CommDateSelect
                    key="startDate"
                    label={"Start Date"}
                    value={new Date(formValues.startDate)}
                    handleChange={(v) =>
                      setFormValues({ ...formValues, startDate: v })
                    }
                    readOnly={isStaff()}
                  />
                  <CommDateSelect
                    key="endDate"
                    label={"End Date"}
                    value={
                      formValues.endDate ? new Date(formValues.endDate) : ""
                    }
                    handleChange={(v) =>
                      setFormValues({ ...formValues, endDate: v })
                    }
                    showCancleIcon
                    readOnly={isStaff()}
                  />
                </Box>
                <Box
                  display="flex"
                  alignItems="start"
                  justifyContent="space-around"
                  p={1}
                  gap={1}
                >
                  <CommFormInput
                    key="name"
                    label={"Name"}
                    value={formValues.name}
                    handleChange={(v) =>
                      setFormValues({ ...formValues, name: v })
                    }
                    sx={{ width: 270 }}
                  />
                  <CommSelectInput
                    label="Task Type"
                    value={formValues.taskTypeId}
                    handleChange={(p) =>
                      setFormValues({ ...formValues, taskTypeId: p })
                    }
                    options={(taskTypes || [])?.map(({ id, name }) => ({
                      label: name,
                      value: id,
                    }))}
                  />
                  <CommSelectInput
                    label="Status"
                    value={formValues.status}
                    handleChange={(p) =>
                      setFormValues({ ...formValues, status: p })
                    }
                    options={Object.keys(taskStatus)}
                  />
                </Box>
                <Box
                  display="flex"
                  alignItems="start"
                  justifyContent="space-around"
                  p={1}
                  gap={1}
                >
                  <CommSelectInput
                    label="Client Name"
                    value={formValues.clientId}
                    handleChange={(p) =>
                      setFormValues({ ...formValues, clientId: p })
                    }
                    options={(clients || []).map(({ id, name }) => ({
                      value: id,
                      label: name,
                    }))}
                    sx={{ width: 270, background: "white" }}
                  />
                  <CommSelectInput
                    label={"Entity Name"}
                    value={formValues.clientEntity}
                    handleChange={(p) =>
                      setFormValues({ ...formValues, clientEntity: p })
                    }
                    options={getEntityOptions(formValues.clientId) || []}
                    readOnly={!Boolean(formValues.clientName)}
                  />
                  <CommSelectInput
                    label="Assignee"
                    value={
                      isStaff()
                        ? formValues.assigneeFullname
                        : formValues.assigneeId
                    }
                    handleChange={(p) =>
                      setFormValues({ ...formValues, assigneeId: p })
                    }
                    options={(users || []).map(({ fName, role, id }) => ({
                      value: id,
                      label: `${fName} - ${role}`,
                    }))}
                    readOnly={isStaff()}
                  />
                </Box>
              </Grid>

              <Grid
                container
                direction="column"
                alignItems="center"
                justifyContent="space-between"
                borderLeft="#dadedf 1px solid"
                borderRight="#dadedf 1px solid"
                height="232px"
                xs={2}
                py={1}
                px={2}
                gap={1}
              >
                {[
                  {
                    key: "totalAmount",
                    label: "Total Amount",
                    value: formValues.totalAmount,
                  },
                  {
                    key: "paidAmount",
                    label: "Paid Amount",
                    value: formValues.paidAmount,
                  },
                  {
                    key: "balanceAmount",
                    label: "Balance Amount",
                    value: formValues.balanceAmount,
                  },
                ].map(({ key, label, value }) => (
                  <CommFormInput
                    key={key}
                    label={label}
                    value={value}
                    handleChange={(v) =>
                      setFormValues({ ...formValues, [key]: v })
                    }
                    icon={<RupeeIcon sx={{ fontSize: "16px", mx: 0 }} />}
                  />
                ))}
              </Grid>

              <Grid
                container
                xs={2}
                direction="column"
                alignItems="center"
                justifyContent={"space-between"}
                height="232px"
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      color="success"
                      checked={formValues.status === "APPROVED"}
                    />
                  }
                  label="Approve"
                  sx={{
                    color: "#2e7d32",
                    bgcolor: "white",
                    px: 3,
                    my: 2,
                    borderRadius: "15px",
                  }}
                />

                <Box
                  width="100%"
                  display="flex"
                  my={0.5}
                  alignItems="center"
                  justifyContent="start"
                >
                  <Grid
                    container
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    width="100%"
                  >
                    <Button
                      label="Update"
                      variant="contained"
                      onClick={() =>
                        updateTask({ payload: { data: formValues } })
                      }
                      sx={{ width: "80%" }}
                      isLoading={isUpdating}
                    />
                    <Typography fontSize="12px" sx={{ fontStyle: "oblique" }}>
                      Updated{" "}
                      {moment(formValues.updatedAt, "YYYYMMDD").fromNow()}
                    </Typography>
                  </Grid>
                  {isAdmin() && (
                    <ThreeDotsIcon
                      sx={{ mb: 2, cursor: "pointer" }}
                      onClick={(e) => setAnchorEl(e.currentTarget)}
                    />
                  )}
                </Box>
              </Grid>
            </Grid>
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
