import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import WhatsappIcon from "@mui/icons-material/Whatsapp";
import { useRef, useState } from "react";
import { Box } from "@mui/system";
import { Select } from "../types/common.types";

export default function ButtonWithOptions({
  sx,
  options = [],
  label,
  handleClick,
  handleSelected,
  color,
}: {
  sx?: any;
  selectedOption: string | number;
  options: string[] | Select[];
  label: string | JSX.Element;
  handleClick: () => void;
  handleSelected: (value: string | number) => void;
  color?: string;
}) {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);

  const handleClose = (event: Event) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }
    setOpen(false);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <ButtonGroup fullWidth variant="contained" ref={anchorRef}>
        <Button sx={{ ...{ width: "80%" }, ...sx }} onClick={handleClick}>
          {label}
        </Button>
        <Button
          sx={{ ...{ width: "20%" }, ...sx }}
          size="small"
          onClick={() => setOpen(!open)}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper
        sx={{ zIndex: 1 }}
        open={open}
        anchorEl={anchorRef.current}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem>
                  {options.map((option, index) => {
                    const { label, value } = option as Select;
                    return (
                      <MenuItem
                        key={`${option}`}
                        onClick={() => {
                          handleSelected(value);
                          setOpen(false);
                        }}
                        sx={{ width: "100%" }}
                        value={value}
                      >
                        {label}
                      </MenuItem>
                    );
                  })}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Box>
  );
}
