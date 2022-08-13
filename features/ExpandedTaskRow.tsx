import {
  Box,
  Checkbox,
  Collapse,
  Divider,
  FormControlLabel,
  Grid,
  ListItemIcon,
  Menu,
  MenuItem,
  MenuProps,
  Popover,
  TableCell,
  Typography,
} from "@mui/material";
import { FormInput } from "../features/FormInput";
import { Row } from "../types/datagrid.types";
import { taskStatus } from "../utils/tasks.utils";
import { Button } from "../components/Button";
import { SelectComponent } from "../components/Select";
import { useEffect, useState } from "react";
import DateSelectPopover from "./DateSelectPopover";
import { useGetLocalStorage } from "../hooks/auth.hooks";
import { isAdmin, isStaff } from "../utils/common.utils";
import RupeeIcon from "@mui/icons-material/CurrencyRupeeOutlined";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import ThreeDotsIcon from "@mui/icons-material/MoreVert";
import { en } from "../constants/labels";
import { useDeleteTask, usePatchTask } from "../hooks/tasks.hooks";
import ConfimationModal from "../components/Modal";
import moment from "moment";

const CommFormInput = ({
  sx = {},
  label,
  readOnly = false,
  value,
  handleChange,
  icon,
}: {
  sx?: any;
  label?: string;
  readOnly?: boolean;
  value: string;
  handleChange: (value: string) => void;
  icon?: any;
}) => (
  <FormInput
    label={""}
    value={value}
    handleOnChange={(value) => (readOnly ? {} : handleChange(value as string))}
    variant="outlined"
    topLabel={`${label} ${readOnly ? "(ReadOnly)" : ""}`}
    sx={{ ...sx, background: "white" }}
    startIcon={icon}
  />
);

const CommSelectInput = ({
  sx,
  label,
  value,
  options,
  handleChange,
  readOnly = false,
}: {
  sx?: any;
  label: string;
  value: string;
  options: string[];
  handleChange: (item: string) => void;
  readOnly?: boolean;
}) => {
  return readOnly ? (
    <CommFormInput
      label={label}
      value={value}
      handleChange={handleChange}
      readOnly
      sx={sx ? sx : { width: 250, background: "white" }}
    />
  ) : (
    <SelectComponent
      label={label}
      selectedOption={value}
      handleSelectOption={(item) => handleChange(item)}
      options={options}
      sx={sx ? sx : { width: 250, background: "white" }}
    />
  );
};
const CommDateSelect = ({
  key,
  handleChange,
  label,
  value,
  showCancleIcon = false,
  readOnly = false,
}: {
  key: string;
  handleChange: (item: Date) => void;
  label: string;
  value: Date | string;
  showCancleIcon?: boolean;
  readOnly?: boolean;
}) => (
  <Box>
    <Typography
      fontSize="13px"
      variant="subtitle2"
      fontWeight={700}
      color="GrayText"
    >
      {`${label} ${readOnly ? "(ReadOnly)" : ""}`}
    </Typography>
    {
      <DateSelectPopover
        date={value}
        sx={{ width: 150, background: "white" }}
        setDate={(item) => handleChange(item as Date)}
        showCancleIcon={showCancleIcon}
        readOnly={readOnly}
      />
    }
  </Box>
);

export const ExpandedDataGridCell = ({
  row,
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

  const [anchorEl, setAnchorEl] = useState<MenuProps["anchorEl"] | null>(null);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const { mutate: updateTask, isLoading: isUpdating } = usePatchTask();
  const { mutate: deleteTask, isLoading: isDeleting } = useDeleteTask();

  return (
    <>
      <TableCell sx={{ p: 0 }} colSpan={colSpan}>
        <Collapse in={open} unmountOnExit>
          <Box width="100%" p={1} bgcolor="#E7EBF0" borderRadius="5px">
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
                  justifyContent="space-between"
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
                  justifyContent="space-between"
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
                    value={formValues.taskTypeName}
                    handleChange={(p) =>
                      setFormValues({ ...formValues, taskTypeName: p })
                    }
                    options={["GST-32", "A", "B", "C", "D", "E"]}
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
                  justifyContent="space-between"
                  p={1}
                  gap={1}
                >
                  <CommSelectInput
                    label="Client Name"
                    value={formValues.clientName}
                    handleChange={(p) =>
                      setFormValues({ ...formValues, clientName: p })
                    }
                    options={[
                      "Sonia Gandhi",
                      "Narendra Modi",
                      "Indira",
                      "Congress",
                      "Gandhi",
                    ]}
                    sx={{ width: 270, background: "white" }}
                  />
                  <CommFormInput
                    key="clientEntity"
                    label={"Entity Name"}
                    value={formValues.clientEntity}
                    handleChange={(p) =>
                      setFormValues({ ...formValues, clientEntity: p })
                    }
                    readOnly
                    sx={{ width: 250 }}
                  />
                  <CommSelectInput
                    label="Assignee"
                    value={formValues.assigneeFullname}
                    handleChange={(p) =>
                      setFormValues({ ...formValues, assigneeFullname: p })
                    }
                    options={[
                      "Aryan Jain",
                      "Rahul",
                      "Indira",
                      "Congress",
                      "Gandhi",
                    ]}
                    readOnly={isStaff()}
                  />
                </Box>
              </Grid>

              <Grid
                container
                direction="column"
                alignItems="center"
                justifyContent="space-between"
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
                justifyContent="space-between"
                height="100%"
                gap={10}
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
                    <Typography fontSize="12px">
                      Updated{" "}
                      {moment(formValues.updatedAt, "YYYYMMDD").fromNow()}
                    </Typography>
                  </Grid>
                  <ThreeDotsIcon
                    sx={{ cursor: "pointer" }}
                    onClick={(e) => setAnchorEl(e.currentTarget)}
                  />
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
