import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import { IFSC_LENGTH, PINCODE_LENGTH } from "../constants/clients.constants";
import { en } from "../constants/labels";
import { QUERY_KEYS } from "../constants/queryKeys";
import {
  getAllClients,
  getAllPincodes,
  getAllTaxpayertypes,
  getBankDetails,
  getClientDetails,
  getClientTasks,
  getPincodeDetails,
  patchClient,
  postClient,
} from "../services/clients.services";
import { PatchClientPayload, PostClientPayload } from "../types/clients.types";

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
      refetchOnMount: false,
      refetchOnWindowFocus: false,
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

export const usePatchClient = () => {
  return useMutation(
    ({
      payload,
      clientId,
    }: {
      payload: PatchClientPayload;
      clientId: string;
    }) => {
      return patchClient(payload, clientId);
    },
    {
      onSuccess: (data, variables) => {
        toast.success(en.toast.clientUpdatedSuccessfully);
      },
      onError: (data, variables) => {
        toast.error(en.toast.clientUpdatedFailed);
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

export const useGetPincodeDetails = (pincode: string) => {
  return useQuery(
    [QUERY_KEYS.GET_PINCODE_DETAILS, pincode],
    () =>
      pincode && pincode.length === PINCODE_LENGTH
        ? getPincodeDetails(pincode)
        : null,
    {
      // onSuccess: () => toast.success(en.toast.clientsFetchSuccess),
      onError: () => toast.error(en.toast.pincodesInvalid),
      placeholderData: null,
    }
  );
};

export const useGetBankDetails = (ifsc: string) => {
  return useQuery(
    [QUERY_KEYS.GET_BANK_DETAILS, ifsc],
    () => (ifsc && ifsc.length === IFSC_LENGTH ? getBankDetails(ifsc) : null),
    {
      // onSuccess: () => toast.success(en.toast.clientsFetchSuccess),
      onError: () => toast.error(en.toast.ifscInvalid),
      placeholderData: null,
    }
  );
};
