import {
  Box,
  Checkbox,
  Collapse,
  FormControlLabel,
  Grid,
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

const CommFormInput = ({
  sx = {},
  label,
  readOnly = false,
  value,
  handleChange,
}: {
  sx?: any;
  label?: string;
  readOnly?: boolean;
  value: string;
  handleChange: (value: string) => void;
}) => (
  <FormInput
    label={""}
    value={value}
    handleOnChange={(value) => (readOnly ? {} : handleChange(value as string))}
    variant="outlined"
    topLabel={label}
    sx={{ ...sx, background: "white" }}
  />
);

const CommSelectInput = ({
  label,
  value,
  options,
  handleChange,
}: {
  label: string;
  value: string;
  options: string[];
  handleChange: (item: string) => void;
}) => (
  <SelectComponent
    label={label}
    selectedOption={value}
    handleSelectOption={(item) => handleChange(item)}
    options={options}
    sx={{ width: 250, background: "white" }}
  />
);

const CommDateSelect = ({
  key,
  handleChange,
  label,
  value,
  showCancleIcon = false,
}: {
  key: string;
  handleChange: (item: Date) => void;
  label: string;
  value: Date | string;
  showCancleIcon?: boolean;
}) => (
  <Box>
    <Typography
      fontSize="13px"
      variant="subtitle2"
      fontWeight={700}
      color="GrayText"
    >
      {label}
    </Typography>
    <DateSelectPopover
      date={value}
      sx={{ width: 150, background: "white" }}
      setDate={(item) => handleChange(item as Date)}
      showCancleIcon={showCancleIcon}
    />
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

  return (
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
                />
                <CommDateSelect
                  key="endDate"
                  label={"End Date"}
                  value={formValues.endDate ? new Date(formValues.endDate) : ""}
                  handleChange={(v) =>
                    setFormValues({ ...formValues, endDate: v })
                  }
                  showCancleIcon
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
                />
                <CommFormInput
                  key="clientEntity"
                  label={"Entity Name"}
                  value={formValues.clientEntity}
                  handleChange={(p) =>
                    setFormValues({ ...formValues, clientEntity: p })
                  }
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
              gap={15}
            >
              <Box
                border="1px white solid"
                display="flex"
                alignItems="center"
                justifyContent="center"
                sx={{ background: "white" }}
                borderRadius="15px"
                width="100%"
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      color="success"
                      checked={formValues.status === "APPROVED"}
                    />
                  }
                  label="Approve"
                  sx={{ color: "#2e7d32" }}
                />
              </Box>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-evenly"
                width="100%"
                height="100%"
                p={1}
              >
                <Button
                  label="Update"
                  variant="contained"
                  onClick={() => console.log(formValues)}
                />
                <Button
                  label="Delete"
                  variant="contained"
                  onClick={() => {}}
                  color="error"
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Collapse>
    </TableCell>
  );
};
