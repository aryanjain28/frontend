import { Box, CircularProgress, Typography } from "@mui/material";
import { SearchableSelectComponent } from "../components/Select";
import { Select } from "../types/common.types";
import DateSelectPopover from "./DateSelectPopover";
import { FormInput } from "./FormInput";

export const Input = ({
  sx = {},
  label,
  readOnly = false,
  required = false,
  isLoading = false,
  value,
  handleChange,
  icon,
  rows,
  type = "text",
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
  type?: string;
}) => (
  <FormInput
    label={""}
    value={value}
    handleOnChange={(value) => handleChange(readOnly ? "" : (value as string))}
    variant="outlined"
    topLabel={`${label} ${readOnly ? "(ReadOnly)" : ""}`}
    sx={{ ...{ background: "white", width: "100%" }, ...sx }}
    startIcon={icon}
    isLoading={isLoading}
    rows={rows}
    type={type}
    required={required}
  />
);

export const SelectInput = ({
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
  value: string | null;
  options: string[] | Select[];
  handleChange: (value: string | null, label?: string | null) => void;
  readOnly?: boolean;
  required?: boolean;
  isLoading?: boolean;
}) => {
  return (
    <SearchableSelectComponent
      label={`${label} ${readOnly ? "(ReadOnly)" : ""}`}
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

export const DateSelect = ({
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
