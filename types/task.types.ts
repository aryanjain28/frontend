import { TaskStatusType } from "./common.types";
import { User } from "./user.types";

export interface Task {
  isNew: boolean;
  id: string;
  name: string;
  type: { taskTypeName: string };
  status: TaskStatusType;
  client: { clientName: string; entity: string };
  assignee: User;
  startDate: string;
  endDate?: string;
  createdBy: User | string;
  createdAt: string;
  updatedAt: string;
  totalAmount?: string;
  paidAmount?: string;
  balanceAmount?: string;
  isApproved?: string;
  updatedBy?: string;
  approvedBy?: string;
  approvedAt?: string;
  assignedBy?: { fName: string; lName: string; email: string };
  assignedAt?: string;
}

export interface ModifiedTask extends Task {
  assigneeFullname: string;
  assignedByFullname?: string;
  clientName: string;
  clientEntity: string;
  createdByName: string;
  createdByEmail: string;
  taskTypeName: string;
}

export interface GetAllTaskReponse {
  status: number;
  message: string;
  data: Task[];
}

export interface GetUsersTasksResponse {
  status: number;
  message: string;
  data: Task[];
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
