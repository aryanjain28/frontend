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
