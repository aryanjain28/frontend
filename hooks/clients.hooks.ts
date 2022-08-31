import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import { en } from "../constants/labels";
import { QUERY_KEYS } from "../constants/queryKeys";
import {
  getAllClients,
  getAllPincodes,
  getAllTaxpayertypes,
  getClientDetails,
  getClientTasks,
  postClient,
} from "../services/clients.services";
import { PostClientPayload } from "../types/clients.types";

export const useGetClients = () => {
  return useQuery([QUERY_KEYS.GET_ALL_CLIENTS], () => getAllClients(), {
    // onSuccess: () => toast.success(en.toast.clientsFetchSuccess),
    onError: () => toast.error(en.toast.clientsFetchFailed),
    placeholderData: [],
    // refetchOnMount: true,
  });
};

export const useGetClientDetails = (clientId: string) => {
  return useQuery(
    [QUERY_KEYS.GET_CLIENT_DETAILS, clientId],
    () => (clientId ? getClientDetails(clientId) : null),
    {
      // onSuccess: () => toast.success(en.toast.clientsFetchSuccess),
      onError: () => toast.error(en.toast.clientsFetchFailed),
      placeholderData: null,
      // refetchOnMount: true,
    }
  );
};

export const useGetClientTasks = (clientId: string) => {
  return useQuery(
    [QUERY_KEYS.GET_CLIENT_TASKS, clientId],
    () => (clientId ? getClientTasks(clientId) : null),
    {
      // onSuccess: () => toast.success(en.toast.clientsFetchSuccess),
      onError: () => toast.error(en.toast.clientsFetchFailed),
      placeholderData: [],
    }
  );
};

export const usePostClient = () => {
  return useMutation(
    ({ payload }: { payload: PostClientPayload }) => {
      return postClient(payload);
    },
    {
      onSuccess: (data, variables) => {
        toast.success(en.toast.clientCreatedSuccessfully);
      },
      onError: (data, variables) => {
        toast.error(en.toast.clientCreatedFailed);
      },
    }
  );
};

export const useGetTaxpayerTypes = () => {
  return useQuery(
    [QUERY_KEYS.GET_ALL_TAXPAYER_TYPES],
    () => getAllTaxpayertypes(),
    {
      // onSuccess: () => toast.success(en.toast.clientsFetchSuccess),
      onError: () => toast.error(en.toast.taxpayerTypesFetchFailed),
      placeholderData: [],
    }
  );
};

export const useGetPincodes = () => {
  return useQuery([QUERY_KEYS.GET_ALL_PINCODES], () => getAllPincodes(), {
    // onSuccess: () => toast.success(en.toast.clientsFetchSuccess),
    onError: () => toast.error(en.toast.pincodesFetchFailed),
    placeholderData: null,
  });
};
