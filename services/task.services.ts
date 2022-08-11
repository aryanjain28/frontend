import { API_ROUTES } from "../constants/routes";
import { GetAllTaskReponse, GetUsersTasksResponse } from "../types/task.types";
import { GET } from "./api";

export const getAllTasks = () => {
  const url = API_ROUTES.GET_TASKS;
  return GET<undefined, GetAllTaskReponse>(url).then((res) => res.data);
};

export const getMyTasks = () => {
  const url = API_ROUTES.GET_MY_TASKS;
  return GET<undefined, GetUsersTasksResponse>(url).then((res) => res.data);
};
