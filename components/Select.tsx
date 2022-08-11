import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { useState } from "react";
import { Box, Chip, Typography } from "@mui/material";

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 200,
    },
  },
};

interface SelectProps {
  label?: string;
  options: string[];
  sx?: any;
}

export default function SelectComponent({ sx, label, options }: SelectProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  return (
    <FormControl sx={{ width: 300 }}>
      <Typography fontSize="13px" color={"GrayText"} fontWeight={700}>
        {label}
      </Typography>
      <Select
        size="small"
        multiple
        value={selectedOptions}
        onChange={(e) => setSelectedOptions(e.target.value as string[])}
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
}
