import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { en } from "../constants/labels";
import { QUERY_KEYS } from "../constants/queryKeys";
import { getAllClients } from "../services/clients.services";

const mockData = [
  {
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
  const { data, isLoading } = useQuery(
    [QUERY_KEYS.GET_ALL_CLIENTS],
    () => getAllClients(),
    {
      // onSuccess: () => toast.success(en.toast.clientsFetchSuccess),
      onError: () => toast.error(en.toast.clientsFetchFailed),
      placeholderData: [],
    }
  );

  return { data: mockData, isLoading };
};
