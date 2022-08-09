import React from "react";

export interface Column {
  headerName: string;
  key: string;
  sortKey?: string;
  disableSort?: boolean;
  hidden?: boolean;
  Component?: React.FC<{ row: any; col: Column }>;
}

export interface ColumnG<T> {
  headerName: string;
  key: string;
  sortKey?: string;
  disableSort?: boolean;
  hidden?: boolean;
  Component?: React.FC<{ row: T; col: ColumnG<T> }>;
}

export interface Row {
  [key: string]: any;
}
