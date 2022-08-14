import { Popover } from "@mui/material";
import { useState } from "react";
import { Calendar } from "react-date-range";
import { formatTime2 } from "../utils/common.utils";
import { FormInput } from "./FormInput";
import CancelIcon from "@mui/icons-material/CancelOutlined";

interface DateSelectPopover {
  date: Date | string | null;
  setDate: (item: Date | string | null) => void;
  sx?: any;
  showCancleIcon?: boolean;
  readOnly?: boolean;
  minDate?: Date;
  maxDate?: Date;
}

const DateSelectPopover = ({
  date,
  setDate,
  sx,
  showCancleIcon = false,
  readOnly = false,
  minDate,
  maxDate,
}: DateSelectPopover) => {
  const [datePopoverOpen, setDatePopoverOpen] = useState(null);
  return (
    <>
      <FormInput
        label=""
        sx={sx ? sx : { width: 300 }}
        value={date ? formatTime2(date) || "" : ""}
        handleOnClick={(e: any) => {
          console.log("FILED CLIKED");
          setDatePopoverOpen(e.currentTarget);
        }}
        handleOnChange={() => null}
        placeholder="Select Date"
        endIcon={
          !readOnly && showCancleIcon && date && <CancelIcon fontSize="small" />
        }
        handleEndIconClick={(e) => {
          setDate(null);
          e.stopPropagation();
        }}
      />
      <Popover
        open={Boolean(datePopoverOpen) && !readOnly}
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
        <Calendar
          onChange={(item) => setDate(item)}
          date={date as Date}
          minDate={minDate}
          maxDate={maxDate}
        />
      </Popover>
    </>
  );
};

export default DateSelectPopover;
