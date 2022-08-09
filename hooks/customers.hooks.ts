import { useMutation, useQuery } from "react-query";
import { QUERY_KEYS } from "../constants/queryKeys";
import {
  deleteCustomer,
  getCustomerDetails,
  getCustomers,
  patchCustomer,
  postCustomer,
} from "../services/customers.services";
import {
  PatchCustomerPayload,
  PostCustomerPayload,
} from "../types/customers.types";

export const useGetCustomers = () => {
  const { data, isLoading, isFetching, refetch } = useQuery(
    [QUERY_KEYS.GET_CUSTOMERS],
    () => getCustomers(),
    { placeholderData: [] }
  );
  return { data, isLoading: isLoading || isFetching, refetch };
};

export const useGetCustomerDetails = (customerId: string) => {
  const { data, isLoading, isFetching, refetch } = useQuery(
    [QUERY_KEYS.GET_CUSTOMER_DETAILS, customerId],
    () => (customerId ? getCustomerDetails(customerId) : null),
    { placeholderData: null }
  );
  return { data, isLoading: isLoading || isFetching, refetch };
};

export const usePostCustomer = () => {
  return useMutation(
    ({ payload }: { payload: PostCustomerPayload }) => {
      return postCustomer(payload);
    },
    {
      onSuccess: (data, variables) => {},
      onError: (data, variables) => {},
    }
  );
};

export const usePatchCustomer = () => {
  return useMutation(
    ({
      customerId,
      payload,
    }: {
      customerId: string;
      payload: PatchCustomerPayload;
    }) => {
      return patchCustomer(customerId, payload);
    },
    {
      onSuccess: (data, variables) => {},
      onError: (data, variables) => {},
    }
  );
};

export const useDeleteCustomer = () => {
  return useMutation(
    ({ customerId }: { customerId: string }) => {
      return deleteCustomer(customerId);
    },
    {
      onSuccess: (data, variables) => {},
      onError: (data, variables) => {},
    }
  );
};
