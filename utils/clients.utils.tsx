import { Typography } from "@mui/material";
import { CustomTooltip } from "../features/CustomTooltip";
import { ModClient } from "../types/clients.types";
import { ColumnG } from "../types/datagrid.types";
import { formatTime3, isStaff } from "./common.utils";
import AvailableIcon1 from "@mui/icons-material/TaskAltOutlined";
import AvailableIcon from "@mui/icons-material/CheckCircle";
import UnavailableIcon1 from "@mui/icons-material/CancelOutlined";
import UnavailableIcon from "@mui/icons-material/MoreHoriz";
import { palette } from "../styles/theme";

const checkAvailibility = (valueToCheck: boolean) =>
  Boolean(valueToCheck) ? (
    <AvailableIcon sx={{ color: palette.primary.success }} fontSize="small" />
  ) : (
    <UnavailableIcon fontSize="small" />
  );

export const getClientsColumns = (): ColumnG<ModClient>[] => [
  {
    headerName: "Name",
    key: "name",
  },
  {
    headerName: "Entity",
    key: "entity",
  },
  {
    headerName: "PAN",
    key: "pan",
  },
  {
    headerName: "Mobile",
    key: "mobile",
  },
  {
    headerName: "GST",
    key: "isGst",
    Component: ({ row }) => checkAvailibility(row.isGst),
  },
  {
    headerName: "Tally",
    key: "isTally",
    Component: ({ row }) => checkAvailibility(row.isTally),
  },
  {
    headerName: "Company",
    key: "isCompany",
    Component: ({ row }) => checkAvailibility(row.isCompany),
  },
  {
    headerName: "Income Tax",
    key: "isIT",
    Component: ({ row }) => checkAvailibility(row.isIT),
  },
  {
    headerName: "Audit",
    key: "isAudit",
    Component: ({ row }) => checkAvailibility(row.isAudit),
  },
  {
    headerName: "Other",
    key: "isOther",
    Component: ({ row }) => checkAvailibility(row.isOther),
  },
];
