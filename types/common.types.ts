export interface APIError {
  response: {
    data: {
      status: number;
      message: string;
    };
  };
}
