import { Popover } from "@mui/material";
import { useState } from "react";
import { Range } from "react-date-range";
import { formatTime2 } from "../utils/common.utils";
import DateRangeComponent from "./DateRangeComponent";
import { FormInput } from "./FormInput";

const DateRangePopover = () => {
  const [datePopoverOpen, setDatePopoverOpen] = useState(null);
  const [dateRange, setDateRange] = useState<Range[]>([
    {
      startDate: new Date(),
      endDate: new Date(new Date().setDate(new Date().getDate() + 5)),
      key: "selection",
      color: "#1E2746",
    },
  ]);

  const getFormattedDateValue = (date: Range) =>
    `${formatTime2(date.startDate + "")} - ${formatTime2(date.endDate + "")}`;

  return (
    <>
      <FormInput
        label=""
        sx={{ width: 300 }}
        value={getFormattedDateValue(dateRange[0])}
        handleOnClick={(e: any) => setDatePopoverOpen(e.currentTarget)}
        handleOnChange={() => null}
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
        <DateRangeComponent
          ranges={dateRange}
          handleChange={(item) => setDateRange(item)}
        />
      </Popover>
    </>
  );
};

export default DateRangePopover;
