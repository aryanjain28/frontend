import { ClientFormFields, ModClient } from "../types/clients.types";
import { ColumnG } from "../types/datagrid.types";
import { isStaff } from "./common.utils";
import AvailableIcon from "@mui/icons-material/CheckCircle";
import UnavailableIcon from "@mui/icons-material/MoreHoriz";
import { palette } from "../styles/theme";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";

export const getArrInGroups = (arr: any, nGroups: number) => {
  const perGroup = Math.ceil(arr.length / nGroups);
  return new Array(nGroups)
    .fill("")
    .map((_, i) => arr.slice(i * perGroup, (i + 1) * perGroup));
};

const checkAvailibility = (valueToCheck: boolean) =>
  Boolean(valueToCheck) ? (
    <AvailableIcon sx={{ color: palette.primary.success }} fontSize="small" />
  ) : (
    <UnavailableIcon fontSize="small" />
  );

export const getClientsColumns = (
  expandedRowId: string | number | null,
  setExpandedRowId: (id: string | number | null) => void
): ColumnG<ModClient>[] => [
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
  {
    headerName: "",
    key: "",
    hidden: isStaff(),
    Component: ({ row }) => {
      return expandedRowId === row.id ? (
        <KeyboardArrowUp
          sx={{ mr: 1, cursor: "pointer" }}
          onClick={() => setExpandedRowId(null)}
        />
      ) : (
        <KeyboardArrowDown
          sx={{ mr: 1, cursor: "pointer" }}
          onClick={() => setExpandedRowId(row.id)}
        />
      );
    },
  },
];

export const clientFormFields: ClientFormFields = {
  businessInfo: [
    { name: "gstIn" },
    { name: "registrationDate", fieldType: "date" },
    { name: "taxpayerType", fieldType: "select" },
    { name: "legalName" },
    { name: "businessName" },
    { name: "businessConstitution", fieldType: "select" },
    { name: "businessActivity" },
    { name: "panNumber" },
  ],
  contactDetails: [
    { name: "address" },
    { name: "city" },
    { name: "district" },
    { name: "state", fieldType: "select" },
    { name: "pinCode" },
    { name: "primaryMob" },
    { name: "secondaryMob" },
    { name: "primaryEmail" },
  ],
  gstFields: [
    { name: "username" },
    { name: "password", fieldType: "password" },
  ],
};
