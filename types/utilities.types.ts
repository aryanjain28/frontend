export type ClientOption = { id: string; name: string; entities: string[] };
export type TaskTypesOption = {
  id: string;
  childName: string;
  parentId: number;
};
export type UserOption = {
  id: string;
  fName: string;
  lName: string;
  role: string;
};

export interface GetAllOptionsTypes {
  status: number;
  message: string;
  data: {
    clients: ClientOption[];
    taskTypes: TaskTypesOption[];
    users: UserOption[];
  };
}

export interface GetDashBoardResponse {
  status: number;
  message: string;
  data: {
    types: { [key: string]: number };
    status: { [key: string]: number };
    amount: { [key: string]: number };
  };
}
