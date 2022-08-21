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
const setData = (allTasks: AllTasks[], isMyTasks = false) => {
  const queryKey = isMyTasks
    ? QUERY_KEYS.MY_MODIFIED_TASK_VALUES
    : QUERY_KEYS.ALL_MODIFIED_TASK_VALUES;
  queryClient.setQueryData([queryKey], () =>
    allTasks?.map((row) => ({
      id: row.id,
      name: row.name,
      startDate: row.startDate,
      status: row.status,
      totalAmount: row.totalAmount,
      paidAmount: row.paidAmount,
      balanceAmount: row.balanceAmount,
      updatedAt: row.updatedAt,
      createdAt: row.createdAt,
      createdByName: `${(row.createdBy as User).fName} ${
        (row.createdBy as User).lName
      }`,
      createdByEmail: (row.createdBy as User).email,
      ...(row?.comments && { comments: row.comments }),
      ...(row?.endDate && { endDate: row.endDate }),
      ...(row?.assignee?.id && { assigneeId: row.assignee.id }),
      ...(row?.assignee?.fName && { assigneeFName: row.assignee.fName }),
      ...(row?.assignee?.lName && { assigneeLName: row.assignee.lName }),
      ...(row?.client?.client?.id && { clientId: row.client.client.id }),
      ...(row?.client?.client?.name && { clientName: row.client.client.name }),
      ...(row?.client?.entity && { clientEntity: row.client.entity }),
      ...(row?.client?.client?.entities && {
        clientEntities: row.client.client.entities,
      }),
      ...(row?.type?.id && { taskTypeId: row.type.id }),
      ...(row?.type?.name && { taskTypeName: row.type.name }),
      ...(typeof row.assignedBy !== "string" && {
        assignedByFName: row.assignedBy?.fName || "",
        assignedByLName: row.assignedBy?.lName || "",
      }),
    }))
  );
};

export const useGetAllModifiedTasks = () => {
  return useQuery<ModifiedTask[]>([QUERY_KEYS.ALL_MODIFIED_TASK_VALUES], {
    placeholderData: [],
  });
};

export const useGetMyModifiedTasks = () => {
  return useQuery([QUERY_KEYS.MY_MODIFIED_TASK_VALUES], {
    placeholderData: [],
  });
};

export const useGetAllTasks = (userId: string) => {
  return useQuery([QUERY_KEYS.GET_ALL_TASKS], () => getAllTasks(), {
    placeholderData: [],
    onSuccess: (data) => {
      // convert to modified tasks and set to another QUERY KEY
      setData(data);
    },
    onError: () => toast.error(en.toast.tasksFetchedFailed),
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });
};

export const useGetMyTasks = (userId: string) => {
  return useQuery(
    [QUERY_KEYS.GET_MY_TASKS],
    () => (userId ? getMyTasks() : null),
    {
      placeholderData: [],
      onSuccess: (data: AllTasks[]) => {
        setData(data, true);
        // toast.success(en.toast.myTasksFetchedSuccess);
      },
      onError: () => toast.error(en.toast.myTasksFetchedFailed),
      refetchOnMount: true,
    }
  );
};

export const usePostTask = () => {
  const { userId } = useGetLocalStorage();
  const { refetch: refetchMyTasks } = useGetMyTasks(userId as string);
  return useMutation(
    ({ payload }: { payload: PostTaskPayload }) => {
      return postTask(payload);
    },
    {
      onSuccess: () => {
        refetchMyTasks();
        toast.success(en.toast.taskCreatedSuccess);
      },
      onError: (data: APIData, variables) => {
        const serverMessage = data.response.data.message;
        toast.error(serverMessage || en.toast.taskCreatedFailed);
      },
    }
  );
};

export const usePatchTask = (isMyTasks = false) => {
  const queryKey = isMyTasks
    ? QUERY_KEYS.MY_MODIFIED_TASK_VALUES
    : QUERY_KEYS.ALL_MODIFIED_TASK_VALUES;
  return useMutation(
    ({ payload }: { payload: PatchTaskPayload }) => {
      return patchTask(payload);
    },
    {
      onSuccess: (data, variables) => {
        const oldTasks = queryClient.getQueryData(queryKey);
        if (oldTasks) {
          queryClient.setQueryData([queryKey], (oldQueryData: any) => {
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
          });
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
  const { refetch } = useGetMyTasks(userId);
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
            [QUERY_KEYS.GET_ALL_TASKS],
            (oldQueryData: any) => {
              const updatedData = oldQueryData?.filter(
                (item: Task) => item.id !== variables.taskId
              );
              return updatedData;
            }
          );
        }
        refetch();
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
