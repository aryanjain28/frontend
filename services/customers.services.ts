import { API_ROUTES } from "../constants/routes";
import {
  DeleteCustomerPayload,
  GetCustomerResponse,
  GetCustomersResponse,
  PatchCustomerPayload,
  PatchCustomerResponse,
  PostCustomerPayload,
  PostCustomerResponse,
} from "../types/customers.types";
import { createRoute } from "../utils/routes";
import { DELETE, GET, PATCH, POST } from "./api";

export const getCustomers = () => {
  const url = API_ROUTES.GET_CUSTOMERS;
  return GET<undefined, GetCustomersResponse>(url).then((res) => res.data);
};

export const getCustomerDetails = (customerId: string) => {
  const url = createRoute(API_ROUTES.GET_CUSTOMER_DETAILS, { customerId });
  return GET<undefined, GetCustomerResponse>(url).then((res) => res.data);
};

export const postCustomer = (payload: PostCustomerPayload) => {
  const url = API_ROUTES.POST_CUSTOMER;
  return POST<PostCustomerPayload, PostCustomerResponse>(url, payload).then(
    (res) => res.data
  );
};

export const patchCustomer = (
  customerId: string,
  payload: PatchCustomerPayload
) => {
  const url = createRoute(API_ROUTES.PATCH_CUSTOMER, { customerId });
  return PATCH<PatchCustomerPayload, PatchCustomerResponse>(url, payload).then(
    (res) => res.data
  );
};

export const deleteCustomer = (customerId: string) => {
  const url = createRoute(API_ROUTES.DELETE_CUSTOMER, { customerId });
  return DELETE<DeleteCustomerPayload, undefined>(url, {
    data: customerId,
  }).then((res) => res);
};
