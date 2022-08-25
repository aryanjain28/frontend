import { ClientFormFields, ModClient } from "../types/clients.types";
import { ColumnG } from "../types/datagrid.types";
import { isStaff } from "./common.utils";
import AvailableIcon from "@mui/icons-material/CheckCircle";
import UnavailableIcon from "@mui/icons-material/MoreHoriz";
import { palette } from "../styles/theme";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { Select } from "../types/common.types";

export const getArrInGroups = (arr: any, perGroup: number = 4) => {
  const nGroups = arr.length % perGroup;
  const finalArr = new Array(nGroups)
    .fill("")
    .map((_, i) =>
      arr.slice(i * perGroup, Math.min((i + 1) * perGroup, arr.length))
    );

  if (perGroup * nGroups < arr.length) {
    const temp = [];
    for (let index = perGroup * nGroups; index < arr.length; index++) {
      const p = arr[index];
      temp.push(p);
    }
    finalArr.push(temp);
  }

  return finalArr;
};

const checkAvailibility = (type: number, arr: number[]) =>
  arr.includes(type) ? (
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
    headerName: "GST IN",
    key: "gstIn",
  },
  {
    headerName: "PAN",
    key: "panNumber",
  },
  {
    headerName: "Mobile",
    key: "primaryMobile",
  },
  {
    headerName: "Business",
    key: "businessName",
  },
  {
    headerName: "Taxpayer",
    key: "taxpayerTypeName",
  },
  {
    headerName: "GST",
    key: "isGst",
    Component: ({ row }) => checkAvailibility(1, row.taskParentIds),
  },
  {
    headerName: "IT",
    key: "isIT",
    Component: ({ row }) => checkAvailibility(2, row.taskParentIds),
  },
  {
    headerName: "Tally",
    key: "isTally",
    Component: ({ row }) => checkAvailibility(3, row.taskParentIds),
  },
  {
    headerName: "Reports",
    key: "isTally",
    Component: ({ row }) => checkAvailibility(4, row.taskParentIds),
  },
  {
    headerName: "Registrations",
    key: "isTally",
    Component: ({ row }) => checkAvailibility(5, row.taskParentIds),
  },
  {
    headerName: "Other",
    key: "isOther",
    Component: ({ row }) => checkAvailibility(6, row.taskParentIds),
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

export const getClientFormFields = (
  options: {
    taxpayerTypesOptions: Select[];
    pincodesOptions: Select[];
  },
  isLoadingState: {
    taxpayerTypesIsLoading: boolean;
    pincodesIsLoading: boolean;
  }
): ClientFormFields => ({
  businessInfo: [
    { name: "name", required: true },
    { name: "panNumber" },
    { name: "gstIn" },
    { name: "registrationDate", fieldType: "date" },
    {
      name: "taxpayerType",
      fieldType: "select",
      options: options.taxpayerTypesOptions,
      required: true,
      isLoading: isLoadingState.taxpayerTypesIsLoading,
    },
    { name: "legalName", required: true },
    { name: "businessName", required: true },
    { name: "businessConstitution", fieldType: "select" },
    { name: "businessActivity" },
    { name: "entities", fieldType: "select" },
  ],
  contactDetails: [
    {
      name: "pincode",
      fieldType: "select",
      required: true,
      options: options.pincodesOptions,
      isLoading: isLoadingState.pincodesIsLoading,
    },
    { name: "city", required: true, readOnly: true },
    { name: "district", required: true, readOnly: true },
    { name: "state", required: true, readOnly: true },
    { name: "address", required: true },
    { name: "primaryMobile", required: true },
    { name: "secondaryMobile" },
    { name: "primaryEmail" },
  ],
  gstFields: [
    { name: "gstUsername" },
    { name: "gstPassword", fieldType: "password" },
  ],
});
