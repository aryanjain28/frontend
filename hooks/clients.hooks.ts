import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { en } from "../constants/labels";
import { QUERY_KEYS } from "../constants/queryKeys";
import { getAllClients } from "../services/clients.services";

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
  const modifiedData = data?.map((p) => ({ ...p, id: p._id }));
  return { data: modifiedData, isLoading };
};
