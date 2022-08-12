import { Box, Collapse, Grid, TableCell } from "@mui/material";
import { FormInput } from "../features/FormInput";
import { TaskStatusType } from "../types/common.types";
import { Row } from "../types/datagrid.types";
import { formatTime } from "../utils/common.utils";
import { taskStatus } from "../utils/tasks.utils";
import { Button } from "../components/Button";
import { SelectComponent } from "../components/Select";

export const ExpandedDataGridCell = ({
  row,
  open,
}: {
  row: Row;
  open: boolean;
}) => {
  const status = taskStatus[row.status as TaskStatusType];
  return (
    <TableCell sx={{ p: 0.4 }} colSpan={11}>
      <Collapse in={open} unmountOnExit timeout={100}>
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
                <FormInput
                  label=""
                  value={`${row.createdBy.fName} ${row.createdBy.lName || ""}`}
                  handleOnChange={() => {}}
                  variant="outlined"
                  topLabel="Created By"
                  sx={{ /*width: 200,*/ background: "white" }}
                />
                <FormInput
                  label=""
                  value={`${row.createdBy.email || ""}`}
                  handleOnChange={() => {}}
                  variant="outlined"
                  topLabel="Creator's Email"
                  sx={{ /*width: 250,*/ background: "white" }}
                />
                <FormInput
                  label=""
                  value={formatTime(row.startDate)}
                  handleOnChange={() => {}}
                  variant="outlined"
                  topLabel="Start Date"
                  sx={{ /*width: 200,*/ background: "white" }}
                />
                <FormInput
                  label=""
                  value={formatTime(row.endDate)}
                  handleOnChange={() => {}}
                  variant="outlined"
                  topLabel="End Date"
                  sx={{ /*width: 200,*/ background: "white" }}
                />
              </Box>
              <Box
                display="flex"
                alignItems="start"
                justifyContent="space-between"
                p={1}
                gap={1}
              >
                <FormInput
                  label=""
                  value={row.name}
                  handleOnChange={() => {}}
                  variant="outlined"
                  topLabel="Name"
                  sx={{ width: 270, background: "white" }}
                />
                <SelectComponent
                  label="Task Type"
                  selectedOption={"A"}
                  handleSelectOption={() => {}}
                  options={["A", "B", "C", "D", "E"]}
                  sx={{ width: 250, background: "white" }}
                />
                <SelectComponent
                  label="Status"
                  selectedOption={status.label}
                  handleSelectOption={() => {}}
                  options={Object.keys(taskStatus)}
                  sx={{ width: 250, background: "white" }}
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
              <FormInput
                label="Total"
                value={row.totalAmount || "NA"}
                handleOnChange={() => {}}
                variant="outlined"
                sx={{ /*width: 270,*/ background: "white" }}
              />
              <FormInput
                label="Paid"
                value={row.paidAmount || "NA"}
                handleOnChange={() => {}}
                variant="outlined"
                sx={{ /*width: 270,*/ background: "white" }}
              />
              <FormInput
                label="Balance"
                value={row.balanceAmount || "NA"}
                handleOnChange={() => {}}
                variant="outlined"
                sx={{ /*width: 270,*/ background: "white" }}
              />
            </Grid>

            <Grid
              item
              xs={2}
              direction="column"
              alignItems="end"
              justifyContent="end"
              height="100%"
            >
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-evenly"
                width="100%"
                height="100%"
                p={1}
              >
                <Button label="Update" variant="contained" onClick={() => {}} />
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
