import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { Box, CircularProgress, Typography } from "@mui/material";
import { Select as SelectType } from "../types/common.types";
import { en } from "../constants/labels";

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

interface SelecComponentProps {
  selectedOption: string | number;
  handleSelectOption: (value: string, label: string) => void;
  label?: string;
  options: string[] | SelectType;
  sx?: any;
  isLoading?: boolean;
  disabled?: boolean;
}

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
}: SelecComponentProps) => {
  return (
    <>
      <Box display="flex" alignItems="center" gap={1}>
        <Typography fontSize="13px" color={"GrayText"} fontWeight={700}>
          {label}
        </Typography>
        {isLoading && <CircularProgress size={13} />}
      </Box>
      <Select
        size="small"
        value={selectedOption}
        disabled={disabled}
        sx={sx ? sx : {}}
      >
        {options.length > 0 ? (
          options.map((option, index) => {
            const { label, value } =
              typeof option === "string"
                ? { label: option, value: option }
                : option;
            return (
              <MenuItem
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
    </>
  );
};
