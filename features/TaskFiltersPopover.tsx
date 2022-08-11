import { Add } from "@mui/icons-material";
import { Box, Grid, Popover, Typography } from "@mui/material";
import { useState } from "react";
import { Button } from "../components/Button";
import SelectComponent from "../components/Select";
import { en } from "../constants/labels";
import { FilterMap } from "../types/common.types";
import DateRangePopover from "./DateRangePopover";

export const TaskFiltersPopover = ({
  filterMap,
  setFilterMap,
}: TaskFiltersPopover) => {
  const [showFiltersPopover, setShowFiltersPopover] = useState(null);
  const handleSelectOption = (key: string, value: string[]) => {
    if (value.length === 0) {
      delete filterMap[key];
      setFilterMap({ ...filterMap });
    } else {
      setFilterMap({ ...filterMap, [key]: value });
    }
  };
  return (
    <>
      <Button
        label={en.addFilters}
        icon={<Add />}
        onClick={(e) => setShowFiltersPopover(e.currentTarget)}
      />
      <Popover
        open={Boolean(showFiltersPopover)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClose={() => setShowFiltersPopover(null)}
        anchorEl={showFiltersPopover}
      >
        <Box width="500px">
          <Grid
            container
            direction="column"
            justifyContent="centre"
            alignItems="start"
            px={3}
            pt={2}
            pb={4}
            gap={2}
          >
            <SelectComponent
              selectedOptions={filterMap?.status || []}
              handleSelectOption={(value) =>
                handleSelectOption("status", value)
              }
              label={en.status}
              options={["APPROVED", "COMPLETED", "PENDING", "OVERDUE"]}
            />
            <Box>
              <Typography fontSize="13px" color={"GrayText"} fontWeight={700}>
                {en.selectDateRange}
              </Typography>
              <DateRangePopover />
            </Box>
          </Grid>
        </Box>
      </Popover>
    </>
  );
};

interface TaskFiltersPopover {
  filterMap: FilterMap;
  setFilterMap: (value: FilterMap) => void;
}
