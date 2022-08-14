import {
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { ChangeEvent } from "react";

export const FormInput = (props: FormInputProps) => {
  const {
    sx = {},
    isLoading = false,
    type = "text",
    variant = "outlined",
    placeholder,
    rows,
    label,
    value,
    error,
    helperText,
    disabled = false,
    handleOnChange,
    handleOnBlur,
    startIcon,
    endIcon,
    handleStartIconClick,
    handleEndIconClick,
    handleOnClick,
    topLabel = "",
  } = props;

  return (
    <Box>
      {Boolean(topLabel) && (
        <Typography
          fontSize="13px"
          variant="subtitle2"
          fontWeight={700}
          color="GrayText"
        >
          {topLabel}
        </Typography>
      )}
      <TextField
        label={label}
        type={type}
        variant={variant}
        size="small"
        placeholder={placeholder}
        value={value}
        onClick={(e) => (handleOnClick ? handleOnClick(e) : null)}
        onChange={(e) => handleOnChange(e.target.value)}
        onBlur={handleOnBlur}
        multiline={Boolean(rows)}
        rows={rows ? rows : 1}
        error={error}
        helperText={helperText}
        disabled={disabled}
        InputProps={{
          startAdornment: startIcon && (
            <InputAdornment position="start">
              <IconButton onClick={handleStartIconClick}>
                {startIcon}
              </IconButton>
            </InputAdornment>
          ),
          endAdornment: isLoading ? (
            <CircularProgress size={13} />
          ) : (
            endIcon && (
              <InputAdornment position="end">
                <IconButton onClick={(e) => handleEndIconClick!(e)}>
                  {endIcon}
                </IconButton>
              </InputAdornment>
            )
          ),
        }}
        sx={{ ...sx }}
      />
    </Box>
  );
};

interface FormInputProps {
  label: string;
  value: string | number;
  variant?: "filled" | "outlined" | "standard";
  handleOnClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  handleOnChange: (value: string | number) => void;
  handleOnBlur?: () => void;
  type?: string;
  rows?: number;
  sx?: any;
  isLoading?: boolean;
  placeholder?: string;
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
  startIcon?: any; //SvgIconTypeMap | string;
  endIcon?: any; //SvgIconTypeMap | string;
  handleStartIconClick?: () => void;
  handleEndIconClick?: (e: any) => void;
  topLabel?: string;
}
