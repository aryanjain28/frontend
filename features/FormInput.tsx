import { IconButton, InputAdornment, TextField } from "@mui/material";
import React, { ChangeEvent } from "react";

export const FormInput = (props: FormInputProps) => {
  const {
    sx = {},
    type = "text",
    variant = "outlined",
    placeholder,
    rows,
    label,
    value,
    error,
    helperText,
    handleOnChange,
    handleOnBlur,
    startIcon,
    endIcon,
    handleStartIconClick,
    handleEndIconClick,
    handleOnClick,
  } = props;

  return (
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
      InputProps={{
        startAdornment: startIcon && (
          <InputAdornment position="start">
            <IconButton onClick={handleStartIconClick}>{startIcon}</IconButton>
          </InputAdornment>
        ),
        endAdornment: endIcon && (
          <InputAdornment position="end">
            <IconButton onClick={handleEndIconClick}>{endIcon}</IconButton>
          </InputAdornment>
        ),
      }}
      sx={sx}
    />
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
  placeholder?: string;
  error?: boolean;
  helperText?: string;
  startIcon?: any; //SvgIconTypeMap | string;
  endIcon?: any; //SvgIconTypeMap | string;
  handleStartIconClick?: () => void;
  handleEndIconClick?: () => void;
}
