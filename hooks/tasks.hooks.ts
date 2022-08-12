import { useQuery } from "react-query";
import { QUERY_KEYS } from "../constants/queryKeys";
import { getAllTasks, getMyTasks } from "../services/task.services";
import { User } from "../types/user.types";

export const useGetAllTasks = () => {
  const { data, isLoading } = useQuery(
    [QUERY_KEYS.GET_ALL_TASKS],
    () => getAllTasks(),
    { placeholderData: [] }
  );

  const modifiedData = data?.map((row) => ({
    ...row,
    assigneeFullname: `${row.assignee.fName} ${row.assignee.lName}`,
    clientName: row.client.clientName,
    clientEntity: row.client.entity,
    createdByName: `${(row.createdBy as User).fName} ${
      (row.createdBy as User).lName
    }`,
    createdByEmail: (row.createdBy as User).email,
    taskTypeName: row.type.taskTypeName,
  }));

  return { data: modifiedData, isLoading };
};

export const useGetMyTasks = () => {
  const { data, isLoading } = useQuery(
    [QUERY_KEYS.GET_MY_TASKS],
    () => getMyTasks(),
    { placeholderData: [] }
  );
  return { data, isLoading };
};
