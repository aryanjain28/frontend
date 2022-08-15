import { Box, Chip, Grid } from "@mui/material";
import { en } from "../../constants/labels";
import { FormInput } from "../../features/FormInput";
import { TaskFiltersPopover } from "../../features/TaskFiltersPopover";
import { FilterMap } from "../../types/common.types";
import { colors } from "../../utils/common.utils";

const DataGridFeatures = ({
  query,
  setQuery,
  showSearch = true,
  showFilters = true,
  placeholder,
  filterMap = {},
  setFilterMap,
}: DataGridFeaturesProps) => {
  const handleChipDelete = (key: string, valueToDelete: string | number) => {
    if (filterMap[key].length === 1) {
      delete filterMap[key];
      setFilterMap({ ...filterMap });
    } else {
      setFilterMap({
        ...filterMap,
        [key]: filterMap[key].filter((p) => p !== valueToDelete),
      });
    }
  };
  return (
    <Grid
      container
      direction="column"
      alignItems="start"
      justifyContent="space-around"
      gap={1}
      mt={2}
      mb={1}
    >
      <Box display="flex" alignItems="center" justifyContent="start" gap={2}>
        {showSearch && (
          <FormInput
            label={placeholder || en.searchTable}
            value={query || ""}
            handleOnChange={(value) => setQuery!(value as string)}
          />
        )}
        {showFilters && (
          <TaskFiltersPopover
            filterMap={filterMap}
            setFilterMap={setFilterMap}
          />
        )}
      </Box>

      {
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 0.5,
          }}
        >
          {Object.keys(filterMap).map((key: string, index: number) =>
            filterMap[key].map((filterValue) => (
              <Chip
                key={`${filterValue}_${index}`}
                variant="filled"
                color={
                  colors[index % colors.length] as
                    | "default"
                    | "primary"
                    | "secondary"
                    | "error"
                    | "info"
                    | "success"
                    | "warning"
                }
                size="small"
                onDelete={(e: any) => handleChipDelete(key, filterValue)}
                label={filterValue}
                sx={{ textTransform: "lowercase", fontWeight: 700 }}
              />
            ))
          )}
        </Box>
      }
    </Grid>
  );
};

interface DataGridFeaturesProps {
  query: string;
  setQuery: (query: string) => void;
  showSearch?: boolean;
  showFilters?: boolean;
  placeholder?: string;
  filterMap?: FilterMap;
  setFilterMap: (value: FilterMap) => void;
}

export default DataGridFeatures;
