import { Box } from "@mui/material";
import { FilterMap } from "../../types/common.types";
import { Column, Row } from "../../types/datagrid.types";
import DataGridFeatures from "./DataGridFeatures.component";
import DataGridTable from "./DataGridTable.component";

// Main File
const DataGrid = (props: DataGridProps) => {
  const {
    showSearch = true,
    showFilters = true,
    data,
    columns,
    query,
    setQuery,
    isLoading,
    placeholder,
    filterMap,
    setFilterMap,
  } = props;
  return (
    <Box mx={3}>
      <DataGridFeatures
        showSearch={showSearch}
        showFilters={showFilters}
        query={query}
        setQuery={setQuery}
        filterMap={filterMap}
        setFilterMap={setFilterMap}
        placeholder={placeholder}
      />
      <DataGridTable isLoading={isLoading} columns={columns} data={data} />
    </Box>
  );
};

interface DataGridProps {
  showSearch?: boolean;
  showFilters?: boolean;
  columns: Column[];
  data: Row[];
  query: string;
  setQuery: (query: string) => void;
  sx?: any;
  isLoading: boolean;
  placeholder?: string;
  filterMap: FilterMap;
  setFilterMap: (value: FilterMap) => void;
}

export default DataGrid;
