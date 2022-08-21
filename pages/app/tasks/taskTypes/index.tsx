import {
  Box,
  Divider,
  Fade,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { Button } from "../../../../components/Button";
import { en } from "../../../../constants/labels";
import { ROUTES } from "../../../../constants/routes";
import { BreadCrumbsComp } from "../../../../features/BreadCrumbs";
import { CommSelectInput } from "../../../../features/CommTaskInputs";
import PageLayout from "../../../../layouts/PageLayout";
import { palette } from "../../../../styles/theme";
import DeleteIcon from "@mui/icons-material/CancelOutlined";
import { useState } from "react";

const history = [
  {
    gst: "GSTR - 3B",
    it: "Income Tax",
    tally: "For complete",
    reports: "Balance Sheet & Profit/Loss",
    registrations: "GST Registration",
    others: "",
  },
  {
    gst: "GSTR - R1",
    it: "Others",
    tally: "For GSTR Accounting",
    reports: "Project Report",
    registrations: "RERA Registration",
  },
  {
    gst: "GSTR - CMP 08",
    tally: "Others",
    reports: "CMA Report",
    registrations: "Food Registration",
  },
  {
    gst: "Annual GSTR 9",
    reports: "Turnover Certificates",
    registrations: "Gumasta / Shop Establishment",
  },
  {
    gst: "Annual GSTR 9C",
    reports: "Net Worth Certificates",
    registrations: "Trade Licence",
  },
  {
    gst: "Annual GSTR 4",
    reports: "Stock Statement",
    registrations: "Others",
  },
  { gst: "Others", reports: "RERA Certificate" },
  { reports: "Others" },
];

const columns = [
  "GST",
  "Income Tax",
  "Tally Accounting",
  "Reports",
  "Registrations",
  "Others",
];

const borderRight = `1px ${palette.neutral.tint} solid`;

const DataCell = ({ value }: { value: string }) => (
  <TableCell sx={{ borderRight }}>
    <Box display="flex" alignItems="center" justifyContent="space-between">
      <Typography maxWidth={130} noWrap>
        {value}
      </Typography>
      {value && (
        <Tooltip
          TransitionComponent={Fade}
          TransitionProps={{ timeout: 800 }}
          title="Delete"
        >
          <DeleteIcon
            sx={{
              cursor: "pointer",
              color: palette.primary.main,
              fontSize: 16,
            }}
          />
        </Tooltip>
      )}
    </Box>
  </TableCell>
);

const TaskTypes = () => {
  const [parent, setParent] = useState<string | null>(null);
  const [child, setChild] = useState<string | null>(null);

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
                    {columns.map((column) => (
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
                  {history.map(
                    ({ gst, it, tally, reports, registrations, others }, _) => (
                      <TableRow
                        key={`${_}_${gst}`}
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
              <Typography pb={2} letterSpacing={2} fontSize={13}>
                {en.createNewTaskType}
              </Typography>
              <CommSelectInput
                label={en.parentTaskType}
                value={parent}
                handleChange={(v) => setParent(v)}
                options={columns.map((p) => ({ value: p, label: p }))}
                isSearchable
              />
              <CommSelectInput
                label={en.childTaskType}
                value={null}
                handleChange={() => {}}
                options={[]}
                readOnly={!Boolean(parent)}
              />
              <Button
                sx={{
                  my: 2,
                  background: palette.primary.success,
                  textTransform: "none",
                  fontSize: 15,
                }}
                label={en.addTaskType}
                variant="contained"
                onClick={() => {}}
              />
            </Grid>
          </Box>
        </Box>
      </Box>
    </PageLayout>
  );
};

export default TaskTypes;
