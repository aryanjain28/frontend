import { useMemo, useState } from "react";
import { Column, Row } from "../types/datagrid.types";

export const useDataGrid = (props: useDataGridProps) => {
  const {
    columns,
    data,
    pageSize,
    pageNumber: parentPageNumber,
    query,
  } = props;
  const [pageNumber, setPageNumber] = useState(parentPageNumber || 1);

  const filteredTableData = useMemo(
    () =>
      query
        ? data.filter((row: Row) =>
            row.name.toLowerCase().includes(query.toLowerCase())
          )
        : data,
    [data, query]
  );

  const paginatedData: Row[] = useMemo(
    () =>
      filteredTableData.slice(
        pageSize * (pageNumber - 1),
        pageSize * pageNumber
      ),
    [data, filteredTableData, pageSize, pageNumber, query]
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
    [data, filteredTableData, pageSize, pageNumber, query]
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
}
