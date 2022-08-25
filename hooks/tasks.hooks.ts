import { useMutation, useQuery } from "react-query";
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
  postTaskTypes,
} from "../services/task.services";
import { APIData } from "../types/common.types";
import {
  PostTaskPayload,
  PatchTaskPayload,
  Task,
  PostTaskTypePayload,
  MyTasks,
} from "../types/task.types";

export const useGetAllTasks = (userId: string) => {
  return useQuery([QUERY_KEYS.GET_ALL_TASKS], () => getAllTasks(), {
    placeholderData: [],
    onSuccess: (data) => {},
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
      onSuccess: (data: MyTasks[]) => {
        // toast.success(en.toast.myTasksFetchedSuccess);
      },
      onError: () => toast.error(en.toast.myTasksFetchedFailed),
      refetchOnMount: true,
    }
  );
};

export const usePostTask = () => {
  return useMutation(
    ({ payload }: { payload: PostTaskPayload }) => {
      return postTask(payload);
    },
    {
      onSuccess: () => {
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
    ? QUERY_KEYS.GET_MY_TASKS
    : QUERY_KEYS.GET_ALL_TASKS;
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
                  clientId: updatedData.clientId,
                  clientName: updatedData.clientName,
                  clientEntity: updatedData.clientEntity,
                  clientEntities: updatedData.clientEntities,
                  taskTypeId: updatedData.taskTypeId,
                  taskTypeName: updatedData.taskTypeName,
                  updatedAt: new Date(),
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
  const { data, isLoading, isFetching } = useQuery(
    [QUERY_KEYS.GET_ALL_TASK_TYPES],
    () => getAllTaskTypes(),
    {
      placeholderData: [],
      // onSuccess: () => toast.success(en.toast.myTasksFetchedSuccess),
      onError: () => toast.error(en.toast.taskTypeFetchFailed),
    }
  );
  return { data, isLoading: isLoading || isFetching };
};

// Task Types
export const usePostTaskTypes = () => {
  return useMutation(
    ({ payload }: { payload: PostTaskTypePayload }) => {
      return postTaskTypes(payload);
    },
    {
      onSuccess: (data, variables) => {
        const oldAllTasksTypes = queryClient.getQueryData([
          QUERY_KEYS.GET_ALL_TASK_TYPES,
        ]);
        if (oldAllTasksTypes) {
          queryClient.setQueryData(
            [QUERY_KEYS.GET_ALL_TASK_TYPES],
            (oldQueryData: any) => {
              oldQueryData.push({
                childName: variables.payload.data.childName,
                parentId: variables.payload.data.parentId,
              });
              return oldQueryData.sort(
                (a: { parentId: number }, b: { parentId: number }) =>
                  a.parentId < b.parentId
              );
            }
          );
        }
        toast.success(en.toast.taskTypeAddSuccess);
      },
      onError: (data, variables) => {
        toast.error(en.toast.taskTypeAddFailed);
      },
    }
  );
};
