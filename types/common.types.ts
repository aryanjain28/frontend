export type Select = { label: string; value: string }[];

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
