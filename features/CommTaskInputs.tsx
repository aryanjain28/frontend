import { Box, CircularProgress, Typography } from "@mui/material";
import {
  SelectComponent,
  SearchableSelectComponent,
} from "../components/Select";
import { Select } from "../types/common.types";
import DateSelectPopover from "./DateSelectPopover";
import { FormInput } from "./FormInput";

export const CommFormInput = ({
  sx = {},
  label,
  readOnly = false,
  required = false,
  isLoading = false,
  value,
  handleChange,
  icon,
  rows,
  type,
}: {
  sx?: any;
  label?: string;
  readOnly?: boolean;
  required?: boolean;
  value: string | number;
  handleChange?: (value: string | number) => void;
  icon?: any;
  isLoading?: boolean;
  rows?: number;
  type?: string;
}) => (
  <FormInput
    label={""}
    type={type}
    value={value}
    handleOnChange={(value) => (readOnly ? {} : handleChange!(value as string))}
    variant="outlined"
    topLabel={`${label} ${readOnly ? "(ReadOnly)" : ""}`}
    sx={{ ...{ width: "100%", background: "white" }, ...sx }}
    startIcon={icon}
    isLoading={isLoading}
    rows={rows}
    required={required}
  />
);

export const CommSelectInput = ({
  sx = {},
  label,
  value,
  options,
  handleChange,
  readOnly = false,
  required = false,
  isLoading = false,
  isSearchable = false,
  groupBy,
}: {
  sx?: any;
  label: string;
  value: string | number | null;
  options: string[] | Select[] | { value: string; label: JSX.Element }[];
  handleChange: (value: string | number | null, label?: string | null) => void;
  readOnly?: boolean;
  required?: boolean;
  isLoading?: boolean;
  isSearchable?: boolean;
  groupBy?: (option: Select) => string;
}) => {
  return isSearchable ? (
    <SearchableSelectComponent
      label={`${label} ${readOnly ? "(ReadOnly)" : ""}`}
      selectedOption={value}
      handleSelectOption={handleChange}
      options={options as string[] | Select[]}
      sx={{ ...{ width: "100%", background: "white" }, ...sx }}
      isLoading={isLoading}
      readonly={readOnly}
      required={required}
      groupBy={groupBy}
    />
  ) : (
    <SelectComponent
      label={`${label}${required ? "*" : ""} ${readOnly ? "(ReadOnly)" : ""}`}
      selectedOption={value}
      handleSelectOption={handleChange}
      options={options}
      sx={{ ...{ width: "100%", background: "white" }, ...sx }}
      isLoading={isLoading}
      readonly={readOnly}
      required={required}
    />
  );
};

export const CommDateSelect = ({
  handleChange,
  label,
  value,
  showCancleIcon = false,
  readOnly = false,
  required = false,
  isLoading = false,
  sx = {},
  minDate,
  maxDate,
}: {
  handleChange: (item: Date) => void;
  label: string;
  value: Date | string;
  showCancleIcon?: boolean;
  readOnly?: boolean;
  required?: boolean;
  isLoading?: boolean;
  sx?: any;
  minDate?: Date;
  maxDate?: Date;
}) => (
  <Box>
    <Box display="flex" alignItems="center">
      {Boolean(label) && (
        <>
          <Typography
            fontSize="13px"
            variant="subtitle2"
            fontWeight={700}
            color="GrayText"
          >
            {label}
          </Typography>
          <Typography variant="subtitle2" fontWeight={700} color="red">
            {required ? "*" : ""}
          </Typography>
        </>
      )}
      {isLoading && <CircularProgress sx={{ mx: 1 }} size={13} />}
    </Box>

    <DateSelectPopover
      date={value}
      sx={{ ...{ width: "100%", background: "white" }, ...sx }}
      setDate={(item) => handleChange(item as Date)}
      showCancleIcon={showCancleIcon}
      readOnly={readOnly}
      minDate={minDate}
      maxDate={maxDate}
    />
  </Box>
);
