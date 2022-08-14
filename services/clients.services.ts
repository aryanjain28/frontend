import { API_ROUTES } from "../constants/routes";
import { GetAllClientsResponse } from "../types/clients.types";
import { GET } from "./api";

export const getAllClients = () => {
  const url = API_ROUTES.GET_ALL_CLIENTS;
  return GET<undefined, GetAllClientsResponse>(url).then((res) => res.data);
};
