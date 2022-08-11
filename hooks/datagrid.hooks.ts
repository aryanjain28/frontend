import { useMemo, useState } from "react";
import { Column, Row } from "../types/datagrid.types";
import { getNestedObjValue } from "../utils/common.utils";

export const useDataGrid = (props: useDataGridProps) => {
  const {
    columns,
    data,
    pageSize,
    pageNumber: parentPageNumber,
    query,
    filterMap,
  } = props;
  const [pageNumber, setPageNumber] = useState(parentPageNumber || 1);

  const checkFilter = (row: Row) => {
    let check = true;
    if (filterMap) {
      for (const [key, filterValue] of Object.entries(filterMap)) {
        const rowValue = getNestedObjValue(row, key);
        check =
          typeof filterValue === "string" || typeof filterValue === "number"
            ? rowValue === filterValue
            : filterValue.includes(rowValue);
        if (check) return check;
      }
    }
    return check;
  };

  const filteredTableData: any = data.filter((row: Row) => checkFilter(row));

  const queryFilteredTableData = useMemo(
    () =>
      query
        ? filteredTableData.filter((row: Row) =>
            row.name.toLowerCase().includes(query.toLowerCase())
          )
        : filteredTableData,
    [filteredTableData, query]
  );

  const paginatedData: Row[] = useMemo(
    () =>
      queryFilteredTableData.slice(
        pageSize * (pageNumber - 1),
        pageSize * pageNumber
      ),
    [data, queryFilteredTableData, pageSize, pageNumber, query]
  );

  return useMemo(
    () => ({
      paginationProps: {
        pageSize,
        pageNumber,
      },
      dataGridProps: {
        columns,
        data: paginatedData,
        pageSize,
        pageNumber,
      },
    }),
    [data, queryFilteredTableData, pageSize, pageNumber, query]
  );
};

interface useDataGridProps {
  columns: Column[];
  data: Row[];
  pageSize: number;
  query?: string;
  queryKeys?: string[];
  pageNumber?: number;
  setPageNumber?: (page: number) => void;
  searchParam?: string;
  filterMap?: { [key: string]: (string | number) | (string | number)[] };
}
