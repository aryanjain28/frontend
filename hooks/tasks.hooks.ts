import { QueryClient, useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import { en } from "../constants/labels";
import { QUERY_KEYS } from "../constants/queryKeys";
import { queryClient } from "../pages/_app";
import {
  deleteTask,
  getAllTasks,
  getAllTaskTypes,
  getMyTasks,
  patchTask,
} from "../services/task.services";
import { PatchTaskPayload, Task } from "../types/task.types";
import { User } from "../types/user.types";
import { useGetLocalStorage } from "./auth.hooks";

export const useGetAllTasks = () => {
  const { data, isLoading } = useQuery(
    [QUERY_KEYS.GET_ALL_TASKS],
    () => getAllTasks(),
    {
      placeholderData: [],
      // onSuccess: () => toast.success(en.toast.tasksFetchedSuccess),
      onError: () => toast.error(en.toast.tasksFetchedFailed),
      refetchOnWindowFocus: false,
    }
  );

  const modifiedData = data?.map((row) => ({
    ...row,
    assigneeFullname: `${row.assignee.fName} ${row.assignee.lName}`,
    assignedByFullname: `${row.assignedBy?.fName} ${row.assignedBy?.lName}`,
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
  const { fullName } = useGetLocalStorage();
  const { data, isLoading } = useQuery(
    [QUERY_KEYS.GET_MY_TASKS],
    () => getMyTasks(),
    {
      placeholderData: [],
      onSuccess: () => toast.success(en.toast.myTasksFetchedSuccess),
      onError: () => toast.error(en.toast.myTasksFetchedFailed),
    }
  );
  const modifiedData = data?.map((row) => ({
    ...row,
    assigneeFullname: fullName,
    assignedByFullname: `${row.assignedBy?.fName} ${row.assignedBy?.lName}`,
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

export const usePatchTask = () => {
  return useMutation(
    ({ payload }: { payload: PatchTaskPayload }) => {
      return patchTask(payload);
    },
    {
      onSuccess: (data, variables) => {
        const oldAllTasks = queryClient.getQueryData(QUERY_KEYS.GET_ALL_TASKS);
        if (oldAllTasks) {
          queryClient.setQueryData(
            [QUERY_KEYS.GET_ALL_TASKS],
            (oldQueryData: any) => {
              const updatedData = oldQueryData?.map((item: Task) => {
                const row = variables.payload.data;
                if (item.id === variables.payload.data.id) {
                  return {
                    ...item,
                    ...variables.payload.data,
                    assigneeFullname: row.assigneeFullname,
                    clientName: row.clientName,
                    taskTypeName: row.taskTypeName,
                    updatedAt: data.updatedAt,
                  };
                }
                return item;
              });
              return updatedData;
            }
          );
        }
        toast.success(en.toast.taskUpdatedSuccess);
      },
      onError: (data, variables) => {
        toast.error(en.toast.taskUpdatedFailed);
      },
    }
  );
};

export const useDeleteTask = () => {
  return useMutation(
    ({ taskId }: { taskId: string }) => {
      return deleteTask(taskId);
    },
    {
      onSuccess: (data, variables) => {
        const oldAllTasks = queryClient.getQueryData(QUERY_KEYS.GET_ALL_TASKS);
        if (oldAllTasks) {
          queryClient.setQueryData(
            [QUERY_KEYS.GET_ALL_TASKS],
            (oldQueryData: any) => {
              const updatedData = oldQueryData?.filter(
                (item: Task) => item.id !== variables.taskId
              );
              return updatedData;
            }
          );
        }
        toast.success(en.toast.taskDeletedSuccess);
      },
      onError: (data, variables) => {
        toast.error(en.toast.taskDeletedFailed);
      },
    }
  );
};

// Task Types
export const useGetTaskTypes = () => {
  const { data, isLoading } = useQuery(
    [QUERY_KEYS.GET_ALL_TASK_TYPES],
    () => getAllTaskTypes(),
    {
      placeholderData: [],
      // onSuccess: () => toast.success(en.toast.myTasksFetchedSuccess),
      onError: () => toast.error(en.toast.taskTypeFetchFailed),
    }
  );
  const modifiedData = data?.map((p) => ({ ...p, id: p._id }));
  return { data: modifiedData, isLoading };
};
