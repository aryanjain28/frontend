import { Box, Typography } from "@mui/material";
import { SelectComponent } from "../components/Select";
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
}: {
  sx?: any;
  label?: string;
  readOnly?: boolean;
  required?: boolean;
  value: string;
  handleChange: (value: string) => void;
  icon?: any;
  isLoading?: boolean;
  rows?: number;
}) => (
  <FormInput
    label={""}
    value={value}
    handleOnChange={(value) => (readOnly ? {} : handleChange(value as string))}
    variant="outlined"
    topLabel={`${label}${required ? "*" : ""} ${readOnly ? "(ReadOnly)" : ""}`}
    sx={{ ...{ background: "white" }, ...sx }}
    startIcon={icon}
    isLoading={isLoading}
    rows={rows}
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
}: {
  sx?: any;
  label: string;
  value: string;
  options: string[] | Select;
  handleChange: (value: string, label?: string) => void;
  readOnly?: boolean;
  required?: boolean;
  isLoading?: boolean;
}) => {
  return readOnly ? (
    <CommFormInput
      label={label}
      value={value}
      handleChange={handleChange}
      readOnly
      required={required}
      sx={{ ...{ width: 250, background: "white" }, ...sx }}
    />
  ) : (
    <SelectComponent
      label={`${label}${required ? "*" : ""}`}
      selectedOption={value}
      handleSelectOption={handleChange}
      options={options}
      sx={{ ...{ width: 250, background: "white" }, ...sx }}
      isLoading={isLoading}
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
  sx?: any;
  minDate?: Date;
  maxDate?: Date;
}) => (
  <Box>
    <Typography
      fontSize="13px"
      variant="subtitle2"
      fontWeight={700}
      color="GrayText"
    >
      {`${label}${required ? "*" : ""} ${readOnly ? "(ReadOnly)" : ""}`}
    </Typography>
    <DateSelectPopover
      date={value}
      sx={{ ...{ width: 150, background: "white" }, ...sx }}
      setDate={(item) => handleChange(item as Date)}
      showCancleIcon={showCancleIcon}
      readOnly={readOnly}
      minDate={minDate}
      maxDate={maxDate}
    />
  </Box>
);
