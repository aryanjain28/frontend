import { API_ROUTES } from "../constants/routes";
import {
  GetAllClientsResponse,
  GetAllPincodesResponse,
  GetAllTaxpayerTypesResponse,
  GetClientDetailsResponse,
  GetClientTasksResponse,
  GetIFSCDetailsResponse,
  GetPincodeDetailsResponse,
  PatchClientPayload,
  PostClientPayload,
  PostClientResponse,
} from "../types/clients.types";
import { createRoute } from "../utils/routes";
import { GET, PATCH, POST } from "./api";

export const getAllClients = () => {
  const url = API_ROUTES.GET_ALL_CLIENTS;
  return GET<undefined, GetAllClientsResponse>(url).then((res) => res.data);
};

export const getClientDetails = (clientId: string) => {
  const url = createRoute(API_ROUTES.GET_CLIENT_DETAILS, { clientId });
  return GET<undefined, GetClientDetailsResponse>(url).then((res) => res.data);
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

export const patchClient = (payload: PatchClientPayload, clientId: string) => {
  const url = createRoute(API_ROUTES.PATCH_CLIENT, { clientId });
  return PATCH<PatchClientPayload, undefined>(url, payload).then((res) => res);
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

export const getPincodeDetails = (pincode: string) => {
  const url = createRoute(API_ROUTES.GET_PINCODE_DETAILS, { pincode });
  return GET<undefined, GetPincodeDetailsResponse>(url).then((res) => res.data);
};

export const getBankDetails = (ifsc: string) => {
  const url = createRoute(API_ROUTES.GET_BANK_DETAILS, { ifsc });
  return GET<undefined, GetIFSCDetailsResponse>(url).then((res) => res.data);
};
