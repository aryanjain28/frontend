import { API_ROUTES } from "../constants/routes";
import { GetAllOptionsTypes } from "../types/utilities.types";
import { GET } from "./api";

export const getAllOptions = () => {
  const url = API_ROUTES.GET_OPTIONS;
  return GET<undefined, GetAllOptionsTypes>(url).then((res) => res.data);
};
