import { useState } from "react";
import { DateRange, Range, RangeKeyDict } from "react-date-range";

const DateRangeComponent = ({
  ranges,
  handleChange,
}: DateRangeComponentProps) => {
  return (
    <DateRange
      editableDateInputs={true}
      onChange={(item) => handleChange([item.selection])}
      moveRangeOnFirstSelection={false}
      ranges={ranges}
    />
  );
};

interface DateRangeComponentProps {
  handleChange: (value: [RangeKeyDict["selection"]]) => void;
  ranges: Range[];
}

export default DateRangeComponent;
