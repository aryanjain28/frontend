import { useQuery } from "react-query";
import { QUERY_KEYS } from "../constants/queryKeys";
import { getAllOptions } from "../services/utilities.services";

export const useGetAllOptions = () => {
  return useQuery([QUERY_KEYS.GET_OPTIONS], () => getAllOptions(), {
    placeholderData: null,
  });
};
