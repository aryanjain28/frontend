import { API_ROUTES } from "../constants/routes";
import {
  DeleteTaskResponse,
  GetAllTaskReponse,
  GetTaskTypesResponse,
  GetUsersTasksResponse,
  PatchTaskPayload,
  PatchTaskResponse,
  PostTaskPayload,
  PostTaskResponse,
  PostTaskTypePayload,
  PostTaskTypeResponse,
} from "../types/task.types";
import { createRoute } from "../utils/routes";
import { DELETE, GET, PATCH, POST } from "./api";

export const getAllTasks = () => {
  const url = API_ROUTES.GET_TASKS;
  return GET<undefined, GetAllTaskReponse>(url).then((res) => res.data);
};

export const getMyTasks = () => {
  const url = API_ROUTES.GET_MY_TASKS;
  return GET<undefined, GetUsersTasksResponse>(url).then((res) => res.data);
};

export const postTask = (payload: PostTaskPayload) => {
  const url = API_ROUTES.POST_TASK;
  return POST<PostTaskPayload, PostTaskResponse>(url, payload).then(
    (res) => res.data
  );
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

export const postTaskTypes = (payload: PostTaskTypePayload) => {
  const url = API_ROUTES.POST_TASKS_TYPE;
  return POST<PostTaskTypePayload, PostTaskTypeResponse>(url, payload).then(
    (res) => res.data
  );
};
