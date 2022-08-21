import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import { en } from "../constants/labels";
import { QUERY_KEYS } from "../constants/queryKeys";
import {
  getAllClients,
  getAllPincodes,
  getAllTaxpayertypes,
  postClient,
} from "../services/clients.services";
import { PostClientPayload } from "../types/clients.types";

const mockData = [
  {
    id: 1,
    entities: [],
    name: "Client 1",
    entity: "Entity 1",
    pan: "GJKH3425",
    mobile: "9876543211",
    isGst: true,
    isTally: false,
    isCompany: false,
    isIT: false,
    isAudit: true,
    isOther: true,
  },
  {
    id: 2,
    entities: [],
    name: "Client XYZUJ ^&^&*U ",
    entity: "Entity 1",
    pan: "GJKH3425",
    mobile: "9876543211",
    isGst: true,
    isTally: true,
    isCompany: false,
    isIT: true,
    isAudit: true,
    isOther: false,
  },
  {
    id: 3,
    entities: [],
    name: "No He's not a client 1",
    entity: "Entity 1",
    pan: "GJKH3425",
    mobile: "9876543211",
    isGst: false,
    isTally: false,
    isCompany: true,
    isIT: false,
    isAudit: true,
    isOther: true,
  },
  {
    id: 4,
    entities: [],
    name: "Yes jafkl  client number 435nf s",
    entity: "Entity 1",
    pan: "GJKH3425",
    mobile: "9876543211",
    isGst: false,
    isTally: false,
    isCompany: false,
    isIT: true,
    isAudit: 0,
    isOther: 0,
  },
  {
    id: 5,
    entities: [],
    name: "This can be a good client",
    entity: "Entity 1",
    pan: "GJKH3425",
    mobile: "9876543211",
    isGst: true,
    isTally: false,
    isCompany: false,
    isIT: false,
    isAudit: false,
    isOther: true,
  },
  {
    id: 6,
    entities: [],
    name: "This can be a good client",
    entity: "Entity 1",
    pan: "GJKH3425",
    mobile: "9876543211",
    isGst: true,
    isTally: false,
    isCompany: false,
    isIT: false,
    isAudit: false,
    isOther: true,
  },
  {
    id: 7,
    entities: [],
    name: "This can be a good client",
    entity: "Entity 1",
    pan: "GJKH3425",
    mobile: "9876543211",
    isGst: true,
    isTally: false,
    isCompany: false,
    isIT: false,
    isAudit: false,
    isOther: true,
  },
  {
    id: 8,
    entities: [],
    name: "This can be a good client",
    entity: "Entity 1",
    pan: "GJKH3425",
    mobile: "9876543211",
    isGst: true,
    isTally: false,
    isCompany: false,
    isIT: false,
    isAudit: false,
    isOther: true,
  },
  {
    id: 9,
    entities: [],
    name: "This can be a good client",
    entity: "Entity 1",
    pan: "GJKH3425",
    mobile: "9876543211",
    isGst: true,
    isTally: false,
    isCompany: false,
    isIT: false,
    isAudit: false,
    isOther: true,
  },
  {
    id: 10,
    entities: [],
    name: "This can be a good client",
    entity: "Entity 1",
    pan: "GJKH3425",
    mobile: "9876543211",
    isGst: true,
    isTally: false,
    isCompany: false,
    isIT: false,
    isAudit: false,
    isOther: true,
  },
];

export const useGetClients = () => {
  return useQuery([QUERY_KEYS.GET_ALL_CLIENTS], () => getAllClients(), {
    // onSuccess: () => toast.success(en.toast.clientsFetchSuccess),
    onError: () => toast.error(en.toast.clientsFetchFailed),
    placeholderData: [],
  });
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
