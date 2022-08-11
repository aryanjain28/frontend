import { useQuery } from "react-query";
import { QUERY_KEYS } from "../constants/queryKeys";
import { getAllTasks, getMyTasks } from "../services/task.services";

export const useGetAllTasks = () => {
  const { data, isLoading } = useQuery(
    [QUERY_KEYS.GET_ALL_TASKS],
    () => getAllTasks(),
    { placeholderData: [] }
  );
  return { data, isLoading };
};

export const useGetMyTasks = () => {
  const { data, isLoading } = useQuery(
    [QUERY_KEYS.GET_MY_TASKS],
    () => getMyTasks(),
    { placeholderData: [] }
  );
  return { data, isLoading };
};
