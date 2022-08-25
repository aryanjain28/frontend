import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import {
  Autocomplete,
  Box,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Select as SelectType } from "../types/common.types";
import { en } from "../constants/labels";
import { useState } from "react";

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 200,
    },
  },
};

interface SelectProps {
  selectedOptions: (string | number)[];
  handleSelectOption: (value: string[]) => void;
  label?: string;
  options: string[];
  sx?: any;
  disabled?: boolean;
}

export const SearchableSelectComponent = ({
  sx,
  selectedOption,
  handleSelectOption,
  label,
  options,
  disabled = false,
  readonly = false,
  isLoading = false,
  required = false,
  groupBy,
}: {
  selectedOption: string | number | null;
  handleSelectOption: (value: string | null, label: string | null) => void;
  label?: string;
  options: string[] | SelectType[];
  sx?: any;
  isLoading?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  groupBy?: (option: SelectType) => string;
}) => {
  const [selectedOptVal, setSelectedOptVal] = useState<SelectType | null>(
    selectedOption
      ? { value: selectedOption as string, label: selectedOption as string }
      : null
  );
  const handleChange = (e: any, selected: SelectType | null) => {
    let value = null;
    let label = null;
    if (selected) {
      value = selected.value as string;
      label = selected.label;
    }
    handleSelectOption(value, label);
    setSelectedOptVal(
      selected ? { value: value as string, label: label as string } : null
    );
  };
  return (
    <>
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

      <Autocomplete
        key={selectedOption}
        value={selectedOptVal}
        size="small"
        options={options.map((p) =>
          typeof p === "string" ? { value: p, label: p } : p
        )}
        onChange={handleChange}
        disabled={disabled}
        readOnly={readonly}
        renderInput={(params) => (
          <TextField {...params} label="" placeholder="Search Options" />
        )}
        groupBy={groupBy}
        sx={{ ...sx }}
      />
    </>
  );
};

export const SelectMultipleComponent = ({
  sx,
  selectedOptions,
  handleSelectOption,
  label,
  options,
  disabled = false,
}: SelectProps) => {
  return (
    <FormControl sx={{ width: 300 }}>
      <Typography fontSize="13px" color={"GrayText"} fontWeight={700}>
        {label}
      </Typography>
      <Select
        size="small"
        multiple
        value={selectedOptions}
        onChange={(e) => handleSelectOption(e.target.value as string[])}
        renderValue={(s: string[]) => (
          <Typography variant="subtitle2" noWrap>
            {s.join(", ")}
          </Typography>
        )}
        MenuProps={MenuProps}
        {...sx}
      >
        {options.map((option, index) => (
          <MenuItem key={`${option}_${index}`} value={option} sx={{ p: 0 }}>
            <Checkbox size="small" checked={selectedOptions.includes(option)} />
            <Typography variant="subtitle2" noWrap maxWidth={200}>
              {option}
            </Typography>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export const SelectComponent = ({
  sx,
  selectedOption,
  handleSelectOption,
  label,
  options,
  isLoading = false,
  disabled = false,
  required = false,
}: {
  selectedOption: string | number | null;
  handleSelectOption: (value: string, label: string) => void;
  label?: string;
  options:
    | string[]
    | SelectType[]
    | { value: string | number; label: JSX.Element; hidden?: boolean }[];
  sx?: any;
  isLoading?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
}) => {
  return (
    <Grid container direction="column">
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
      <Select
        size="small"
        value={selectedOption}
        disabled={disabled}
        sx={sx ? sx : {}}
      >
        {options.length > 0 ? (
          options.map((option, index) => {
            const {
              label,
              value,
              hidden = false,
            } = typeof option === "string"
              ? { label: option, value: option, hidden: false }
              : option;
            return (
              <MenuItem
                sx={hidden ? { display: "none" } : {}}
                key={`${option}_${index}`}
                value={value}
                onClick={() =>
                  handleSelectOption(value as string, label as string)
                }
              >
                {label}
              </MenuItem>
            );
          })
        ) : (
          <MenuItem>
            <Typography color="GrayText" fontSize={14}>
              {en.noAvailableOptions}
            </Typography>
          </MenuItem>
        )}
      </Select>
    </Grid>
  );
};
