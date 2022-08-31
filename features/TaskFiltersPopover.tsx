import { Add, CheckBox } from "@mui/icons-material";
import { Box, Grid, Popover, Typography } from "@mui/material";
import { useState } from "react";
import { Button } from "../components/Button";
import { SelectMultipleComponent } from "../components/Select";
import { en } from "../constants/labels";
import { FilterMap } from "../types/common.types";
import { getTaskStatus } from "../utils/tasks.utils";
import DateRangePopover from "./DateRangePopover";

export const TaskFiltersPopover = ({
  filterMap,
  setFilterMap,
}: TaskFiltersPopover) => {
  const [showFiltersPopover, setShowFiltersPopover] = useState(null);
  const [selected, setSelected] = useState([]);
  const handleSelectOption = (key: string, value: string[]) => {
    if (value.length === 0) {
      delete filterMap[key];
      setFilterMap({ ...filterMap });
    } else {
      setFilterMap({ ...filterMap, [key]: value });
    }
  };
  const taskStatus = getTaskStatus();
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
        <Box>
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
            <SelectMultipleComponent
              selectedOptions={filterMap?.status || []}
              handleSelectOption={(value) =>
                handleSelectOption("status", value)
              }
              label={en.status}
              options={Object.values(taskStatus)
                .filter((p) => !p.hidden)
                .map((p) => p.label)}
            />
            {/* <Box>
              <Typography fontSize="13px" color={"GrayText"} fontWeight={700}>
                {en.status}
              </Typography>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="start"
                height={40}
                width="100%"
                gap={2}
              >
                {Object.values(taskStatus)
                  .filter((p) => !p.hidden)
                  .map((p) => (
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="start"
                    >
                      <CheckBox
                        color="success"
                        fontSize="small"
                        // onClick={() => handleSelectOption("status", [...filterMap.status, ])}
                      />
                      <Typography pl={0.5}>{p.label}</Typography>
                    </Box>
                  ))}
              </Box>
            </Box> */}
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
