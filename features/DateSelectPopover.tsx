import { Popover } from "@mui/material";
import { useState } from "react";
import { Calendar } from "react-date-range";
import { formatTime2 } from "../utils/common.utils";
import { FormInput } from "./FormInput";
import CancelIcon from "@mui/icons-material/CancelOutlined";

interface DateSelectPopover {
  date: Date | string;
  setDate: (item: Date | string) => void;
  sx?: any;
  showCancleIcon?: boolean;
}

const DateSelectPopover = ({
  date,
  setDate,
  sx,
  showCancleIcon = false,
}: DateSelectPopover) => {
  const [datePopoverOpen, setDatePopoverOpen] = useState(null);
  return (
    <>
      <FormInput
        label=""
        sx={sx ? sx : { width: 300 }}
        value={date ? formatTime2(date) || "" : ""}
        handleOnClick={(e: any) => setDatePopoverOpen(e.currentTarget)}
        handleOnChange={() => null}
        placeholder="Select Date"
        endIcon={showCancleIcon && date && <CancelIcon fontSize="small" />}
        handleEndIconClick={() => setDate("")}
      />
      <Popover
        open={Boolean(datePopoverOpen)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClose={() => setDatePopoverOpen(null)}
        anchorEl={datePopoverOpen}
      >
        <Calendar onChange={(item) => setDate(item)} date={date as Date} />
      </Popover>
    </>
  );
};

export default DateSelectPopover;
