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
  totalAmount?: number;
  paidAmount?: number;
  balanceAmount?: number;
  isApproved?: boolean;
  updatedBy?: string;
  approvedBy?: User | string;
  approvedAt?: string;
  assignedBy?: User | string;
  assignedAt?: Date;
  comments?: string;
}

export interface AllTasks {
  id: string; // "63053587b6510a88735e84f7";
  name: string; // "Task 101";
  startDate: Date; // "2022-08-23T20:12:34.996Z";
  status: string; // "PENDING";
  totalAmount: number; // 4000;
  paidAmount: number; // 400;
  balanceAmount: number; // 3600;
  updatedAt: Date; // "2022-08-23T20:16:07.701Z";
  createdByName: string; // "SandeepSao";
  createdByEmail: string; // "sandeepsao@gmail.com";
  comments: string; // "hsdf.lsd2342342";
  endDate: Date; // "2022-08-25T20:12:34.996Z";
  assigneeId: string; // "62f3820ee74d73af9a6a20b0";
  assigneeFName: string; // "Yash";
  assigneeLName: string; // "Nema";
  clientId: string; // "6302119058a4b2b944f696ef";
  clientName: string; // "Aryan Jain";
  clientEntity: string;
  taskTypeId: string; // "62f270e342f3ec082d360886";
  taskTypeName: string; // "GST-3B";
  taskTypeParentId: string; // 1;
  assignedAt: Date; // "2022-08-23T20:16:07.701Z";
  assignedByFName: string; // "Sandeep";
  assignedByLName: string; // "Sao";
}

export interface ModifiedTask {
  id: string;
  name: string;
  startDate: string;
  status: "PENDING" | "APPROVED" | "COMPLETED";
  totalAmount: number;
  paidAmount: number;
  balanceAmount: number;
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
  data: { id: string; childName: string; parentId: number }[];
}

export interface PostTaskTypePayload {
  data: {
    parentId: number;
    childName: string;
  };
}

export interface PostTaskTypeResponse {
  status: number;
  message: string;
  data: {
    parentId: number;
    childName: string;
    createdBy: string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
  };
}
