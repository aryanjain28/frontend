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
}

interface SelecComponentProps {
  selectedOption: string | number;
  handleSelectOption: (value: string) => void;
  label?: string;
  options: string[] | SelectType;
  sx?: any;
  isLoading?: boolean;
}

export const SelectMultipleComponent = ({
  sx,
  selectedOptions,
  handleSelectOption,
  label,
  options,
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
}: SelecComponentProps) => {
  return (
    <FormControl>
      <Box display="flex" alignItems="center" gap={1}>
        <Typography fontSize="13px" color={"GrayText"} fontWeight={700}>
          {label}
        </Typography>
        {isLoading && <CircularProgress size={13} />}
      </Box>
      <Select
        size="small"
        value={selectedOption}
        onChange={(e) => handleSelectOption(e.target.value as string)}
        sx={sx ? sx : {}}
      >
        {options.length > 0 ? (
          options.map((option, index) => {
            const { label, value } =
              typeof option === "string"
                ? { label: option, value: option }
                : option;
            return (
              <MenuItem key={`${option}_${index}`} value={value}>
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
    </FormControl>
  );
};
