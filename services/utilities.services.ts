import { API_ROUTES } from "../constants/routes";
import {
  GetAllOptionsTypes,
  GetDashBoardResponse,
} from "../types/utilities.types";
import { GET } from "./api";

export const getAllOptions = () => {
  const url = API_ROUTES.GET_OPTIONS;
  return GET<undefined, GetAllOptionsTypes>(url).then((res) => res.data);
};

export const getDashboardDetails = () => {
  const url = API_ROUTES.GET_DASHBOARD;
  return GET<undefined, GetDashBoardResponse>(url).then((res) => res.data);
};
