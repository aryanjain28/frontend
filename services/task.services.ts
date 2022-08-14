import { API_ROUTES } from "../constants/routes";
import {
  DeleteTaskResponse,
  GetAllTaskReponse,
  GetTaskTypesResponse,
  GetUsersTasksResponse,
  PatchTaskPayload,
  PatchTaskResponse,
} from "../types/task.types";
import { createRoute } from "../utils/routes";
import { DELETE, GET, PATCH } from "./api";

export const getAllTasks = () => {
  const url = API_ROUTES.GET_TASKS;
  return GET<undefined, GetAllTaskReponse>(url).then((res) => res.data);
};

export const getMyTasks = () => {
  const url = API_ROUTES.GET_MY_TASKS;
  return GET<undefined, GetUsersTasksResponse>(url).then((res) => res.data);
};

export const patchTask = (payload: PatchTaskPayload) => {
  const url = createRoute(API_ROUTES.UPDATE_TASK, {
    taskId: payload.data.id as string,
  });
  return PATCH<PatchTaskPayload, PatchTaskResponse>(url, payload).then(
    (res) => res.data
  );
};

export const deleteTask = (taskId: string) => {
  const url = createRoute(API_ROUTES.UPDATE_TASK, { taskId });
  return DELETE<undefined, DeleteTaskResponse>(url).then((res) => res);
};

// Task types
export const getAllTaskTypes = () => {
  const url = API_ROUTES.GET_TASKS_TYPES;
  return GET<undefined, GetTaskTypesResponse>(url).then((res) => res.data);
};
