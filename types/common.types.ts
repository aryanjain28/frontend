export type Select = {
  label: string | JSX.Element;
  value: string | number;
  hidden?: boolean;
  groupByValue?: string;
};

export interface APIData {
  response: { data: { status: number; message: string } };
}

export interface APIError {
  response: {
    data: {
      status: number;
      message: string;
    };
  };
}

export interface FilterMap {
  [key: string]: (string | number)[];
}

export type TaskStatusType = "APPROVED" | "COMPLETED" | "PENDING";
