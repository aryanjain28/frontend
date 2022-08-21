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
  comments?: string;
}

export interface AllTasks extends Task {
  assignee: User;
}

export interface ModifiedTask {
  id: string;
  name: string;
  startDate: string;
  status: "PENDING" | "APPROVED" | "COMPLETED";
  totalAmount: string;
  paidAmount: string;
  balanceAmount: string;
  updatedAt: string;
  createdAt: string;
  createdByName: string;
  createdByEmail: string;
  taskTypeName: string;

  comments?: string;
  endDate?: string;
  assigneeId?: string;
  clientId?: string;
  clientEntities?: string[];
  taskTypeId?: string;
  assigneeFName?: string;
  assigneeLName?: string;
  assignedByFName?: string;
  assignedByLName?: string;
  clientName?: string;
  clientEntity?: string;
  assignee?: User;
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
