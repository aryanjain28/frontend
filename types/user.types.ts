import { AssignedTask } from "./task.types";

export interface User {
  fName: string;
  lName: string;
  email: string;
  password: string;
}

export interface PostUserPayload {
  data: User;
}

export interface PostUserResponse {
  status: number;
  message: string;
  token: string;
}

export interface PostLoginUserPayload {
  data: {
    email: string;
    password: string;
  };
}

export interface PostLoginUserResponse {
  status: number;
  message: string;
  data: {
    userId: string;
    fName: string;
    lName: string;
    token: string;
    email: string;
  };
}

export interface GetUserDetailsResponse {
  status: number;
  message: string;
  data: {
    id: string;
    fName: string;
    lName: string;
    email: string;
    role: "ADMIN" | "STAFF";
    tasks: AssignedTask[];
    createdAt: string;
    updatedAt: string;
  };
}
