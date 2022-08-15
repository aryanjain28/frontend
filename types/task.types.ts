import { TaskStatusType } from "./common.types";

export interface User {
  fName: string;
  lName: string;
  email: string;
  id: string;
}

export interface Task {
  isNew: boolean;
  id: string;
  name: string;
  type: { id: string; name: string };
  status: TaskStatusType;
  client: {
    client: { id: string; name: string; entities: string[] };
    entity: string;
  };
  startDate: Date;
  endDate?: Date;
  createdBy: User | string;
  createdAt: Date;
  updatedAt: Date;
  totalAmount?: string;
  paidAmount?: string;
  balanceAmount?: string;
  isApproved?: boolean;
  updatedBy?: string;
  approvedBy?: User | string;
  approvedAt?: string;
  assignedBy?: User | string;
  assignedAt?: Date;
}

export interface AllTasks extends Task {
  assignee: User;
}

export interface ModifiedTask extends Task {
  assigneeFName: string;
  assigneeLName: string;
  assignedByFName: string;
  assignedByLName: string;
  clientName: string;
  clientEntity: string;
  createdByName: string;
  createdByEmail: string;
  taskTypeName: string;
  assignee: User;
}

export interface GetAllTaskReponse {
  status: number;
  message: string;
  data: AllTasks[];
}

export interface GetUsersTasksResponse {
  status: number;
  message: string;
  data: Task[];
}

export interface PostTaskPayload {
  data: { [key: string]: string | number | Date | [] };
}

export interface PostTaskResponse {
  status: number;
  message: string;
  data: { [key: string]: string | number | [] };
}

export interface PatchTaskPayload {
  data: { [key: string]: string | number | [] };
}

export interface PatchTaskResponse {
  status: number;
  message: string;
  data: { [key: string]: string | number | [] };
}

export interface DeleteTaskResponse {
  status: number;
  message: string;
}

export interface GetTaskTypesResponse {
  status: number;
  message: string;
  data: { id: string; name: string }[];
}
