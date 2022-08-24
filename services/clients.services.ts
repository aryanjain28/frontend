import { API_ROUTES } from "../constants/routes";
import {
  GetAllClientsResponse,
  GetAllPincodesResponse,
  GetAllTaxpayerTypesResponse,
  GetClientTasksResponse,
  PostClientPayload,
  PostClientResponse,
} from "../types/clients.types";
import { createRoute } from "../utils/routes";
import { GET, POST } from "./api";

export const getAllClients = () => {
  const url = API_ROUTES.GET_ALL_CLIENTS;
  return GET<undefined, GetAllClientsResponse>(url).then((res) => res.data);
};

export const getClientTasks = (clientId: string) => {
  const url = createRoute(API_ROUTES.GET_CLIENT_TASKS, { clientId });
  return GET<undefined, GetClientTasksResponse>(url).then((res) => res.data);
};

export const postClient = (payload: PostClientPayload) => {
  const url = API_ROUTES.POST_CLIENT;
  return POST<PostClientPayload, PostClientResponse>(url, payload).then(
    (res) => res.data
  );
};

export const getAllTaxpayertypes = () => {
  const url = API_ROUTES.GET_ALL_TAXPAYER_TYPES;
  return GET<undefined, GetAllTaxpayerTypesResponse>(url).then(
    (res) => res.data
  );
};

export const getAllPincodes = () => {
  const url = API_ROUTES.GET_ALL_PINCODES;
  return GET<undefined, GetAllPincodesResponse>(url).then((res) => res.data);
};
