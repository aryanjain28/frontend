import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { Box, Divider, Typography } from "@mui/material";

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
  options: string[];
  sx?: any;
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
}: SelecComponentProps) => {
  return (
    <FormControl>
      <Typography fontSize="13px" color={"GrayText"} fontWeight={700}>
        {label}
      </Typography>
      <Select
        size="small"
        value={selectedOption}
        onChange={(e) => handleSelectOption(e.target.value as string)}
        sx={sx ? sx : {}}
      >
        {options.map((option, index) => (
          <Box p={0}>
            <MenuItem key={`${option}_${index}`} value={option} sx={{ py: 0 }}>
              <Typography variant="subtitle2" noWrap maxWidth={200}>
                {option}
              </Typography>
            </MenuItem>
            {index + 1 < options.length && <Divider sx={{ my: 0 }} />}
          </Box>
        ))}
      </Select>
    </FormControl>
  );
};
