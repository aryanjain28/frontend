import { ClientFormFields, ModClient } from "../types/clients.types";
import { ColumnG } from "../types/datagrid.types";
import { isStaff } from "./common.utils";
import AvailableIcon from "@mui/icons-material/CheckCircle";
import UnavailableIcon from "@mui/icons-material/MoreHoriz";
import { palette } from "../styles/theme";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { Select } from "../types/common.types";
import { Link, Typography } from "@mui/material";
import { createRoute } from "./routes";
import { ROUTES } from "../constants/routes";
import { en } from "../constants/labels";

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
    Component: ({ row }) => {
      const url = createRoute(ROUTES.clientUpdate, { clientId: `${row.id}` });
      return (
        <Link href={url}>
          <Typography variant="body1">{row.name}</Typography>
        </Link>
      );
    },
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
  personalInfo: [
    { name: "code" },
    {
      name: "prefix",
      fieldType: "select",
      options: ["Mr.", "Mrs.", "Ms."],
      required: true,
    },
    { name: "firstName", required: true },
    { name: "middleName" },
    { name: "lastName" },

    { name: "spouseName" },
    { name: "fatherName" },

    { name: "dob", fieldType: "date", required: true },
    {
      name: "sex",
      fieldType: "select",
      options: ["Male", "Female", "Prefer Not to Say"],
      required: true,
    },
    {
      name: "maritalStatus",
      fieldType: "select",
      options: ["Single", "Married", "Divorced", "Widowed"],
    },
  ],
  contactDetails: [
    { name: "addressLine1", required: true },
    { name: "addressLine2" },

    {
      name: "pincode",
      fieldType: "select",
      required: true,
      options: options.pincodesOptions,
      isLoading: isLoadingState.pincodesIsLoading,
    },
    { name: "district", required: true, readOnly: true },
    { name: "city", required: true, readOnly: true },
    { name: "state", required: true, readOnly: true },
    { name: "primaryMobile", required: true },
    { name: "secondaryMobile" },
    { name: "primaryEmail" },
  ],
  businessInfo: [
    { name: "panNumber" },
    { name: "aadharNumber" },
    { name: "aadharName" },
    { name: "passportNumber" },
    { name: "gstIn" },
    { name: "gstUsername" },
    { name: "gstPassword", fieldType: "password" },
    { name: "businessName", required: true },
    { name: "businessActivity" },
    { name: "registrationDate", fieldType: "date" },
  ],
  bankDetails: [
    { name: "bankIFSC" },
    { name: "bankMICR" },
    { name: "bankName" },
    { name: "bankBranch" },
    { name: "bankAddress" },
    { name: "bankCity" },
    { name: "bankState" },
    { name: "bankCentre" },
    { name: "bankContact" },
  ],
});

export const getClientFieldsInit = ({
  personalInfo,
  contactDetails,
  businessInfo,
  bankDetails,
}: ClientFormFields) => [
  {
    isExpanded: true,
    label: `1. ${en.personalInfo}`,
    formFields: personalInfo,
  },
  {
    isExpanded: true,
    label: `2. ${en.contactDetails}`,
    formFields: contactDetails,
  },
  {
    isExpanded: true,
    label: `3. ${en.businessDetails}`,
    formFields: businessInfo,
  },
  {
    isExpanded: true,
    label: `4. ${en.bankDetails}`,
    formFields: bankDetails,
  },
];
