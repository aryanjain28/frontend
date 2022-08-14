import { useCallback, useMemo } from "react";
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
  postTask,
} from "../services/task.services";
import { APIData } from "../types/common.types";
import {
  PostTaskPayload,
  PatchTaskPayload,
  Task,
  AllTasks,
  ModifiedTask,
} from "../types/task.types";
import { User } from "../types/task.types";
import { useGetLocalStorage } from "./auth.hooks";

// Setter for modified tasks
const setData = (allTasks: AllTasks[]) => {
  queryClient.setQueryData([QUERY_KEYS.MODIFIED_TASK_VALUES], () =>
    allTasks?.map((row) => ({
      ...row,
      ...(row?.assignee?.id && { assigneeId: row.assignee.id }),
      ...(row?.assignee?.fName && { assigneeFName: row.assignee.fName }),
      ...(row?.assignee?.lName && { assigneeLName: row.assignee.lName }),
      ...(row?.client?.client?.id && { clientId: row.client.client.id }),
      ...(row?.client?.client?.name && { clientName: row.client.client.name }),
      ...(row?.client?.entity && { clientEntity: row.client.entity }),
      ...(row?.client?.client?.entities && {
        clientEntities: row.client.client.entities,
      }),
      createdByName: `${(row.createdBy as User).fName} ${
        (row.createdBy as User).lName
      }`,
      createdByEmail: (row.createdBy as User).email,
      ...(row?.type?.id && { taskTypeId: row.type.id }),
      ...(row?.type?.name && { taskTypeName: row.type.name }),
      ...(typeof row.assignedBy !== "string" && {
        assignedByFName: row.assignedBy?.fName || "",
        assignedByLName: row.assignedBy?.lName || "",
      }),
    }))
  );
};

export const useGetModifiedTasks = () => {
  return useQuery([QUERY_KEYS.MODIFIED_TASK_VALUES], { placeholderData: [] });
};

export const useGetAllTasks = (userId: string) => {
  return useQuery([QUERY_KEYS.GET_ALL_TASKS, userId], () => getAllTasks(), {
    placeholderData: [],
    onSuccess: (data) => {
      // convert to modified tasks and set to another QUERY KEY
      setData(data);
    },
    onError: () => toast.error(en.toast.tasksFetchedFailed),
    refetchOnWindowFocus: false,
  });
};

export const useGetMyTasks = (userId: string) => {
  return useQuery(
    [QUERY_KEYS.GET_MY_TASKS, userId],
    () => (userId ? getMyTasks() : null),
    {
      placeholderData: [],
      onSuccess: (data: ModifiedTask[]) => {
        setData(data);
        // toast.success(en.toast.myTasksFetchedSuccess);
      },
      onError: () => toast.error(en.toast.myTasksFetchedFailed),
    }
  );
};

export const usePostTask = () => {
  const { userId } = useGetLocalStorage();
  const { refetch } = useGetAllTasks(userId as string);
  return useMutation(
    ({ payload }: { payload: PostTaskPayload }) => {
      return postTask(payload);
    },
    {
      onSuccess: () => {
        refetch();
        toast.success(en.toast.taskCreatedSuccess);
      },
      onError: (data: APIData, variables) => {
        const serverMessage = data.response.data.message;
        toast.error(serverMessage || en.toast.taskCreatedFailed);
      },
    }
  );
};

export const usePatchTask = () => {
  return useMutation(
    ({ payload }: { payload: PatchTaskPayload }) => {
      return patchTask(payload);
    },
    {
      onSuccess: (data, variables) => {
        const oldTasks = queryClient.getQueryData(
          QUERY_KEYS.MODIFIED_TASK_VALUES
        );
        if (oldTasks) {
          queryClient.setQueryData(
            [QUERY_KEYS.MODIFIED_TASK_VALUES],
            (oldQueryData: any) => {
              return oldQueryData?.map((item: Task) => {
                const updatedData = variables.payload.data;
                if (item.id === variables.payload.data.id) {
                  return {
                    ...item,
                    ...variables.payload.data,
                    assigneeId: updatedData.assigneeId,
                    assigneeFName: updatedData.assigneeFName,
                    assigneeFullname: updatedData.assigneeFullname,
                    clientId: updatedData.clientId,
                    clientName: updatedData.clientName,
                    clientEntity: updatedData.clientEntity,
                    clientEntities: updatedData.clientEntities,
                    taskTypeId: updatedData.taskTypeId,
                    taskTypeName: updatedData.taskTypeName,
                    updatedAt: data.updatedAt,
                  };
                }
                return item;
              });
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

export const useDeleteTask = (userId: string) => {
  return useMutation(
    ({ taskId }: { taskId: string }) => {
      return deleteTask(taskId);
    },
    {
      onSuccess: (data, variables) => {
        const oldAllTasks = queryClient.getQueryData([
          QUERY_KEYS.GET_ALL_TASKS,
          userId,
        ]);
        if (oldAllTasks) {
          queryClient.setQueryData(
            [QUERY_KEYS.GET_ALL_TASKS, userId],
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
  return { data, isLoading };
};
