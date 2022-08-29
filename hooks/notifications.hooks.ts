import { useMutation, useQuery } from "react-query";
import { QUERY_KEYS } from "../constants/queryKeys";
import { queryClient } from "../pages/_app";
import {
  getNotifications,
  removeNotifications,
} from "../services/notifications.services";

export const useGetNotifications = (userId: string) => {
  return useQuery(
    [QUERY_KEYS.GET_NOTIFICATIONS, userId],
    () => (userId ? getNotifications(userId) : null),
    {
      placeholderData: [],
      refetchInterval: 1000 * 60 * 3, // 3 minutes
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    }
  );
};

export const usePatchNotifications = () => {
  return useMutation(
    ({ userId }: { userId: string }) => {
      return removeNotifications(userId);
    },
    {
      onSuccess: (data, variables) => {
        queryClient.setQueryData(
          [QUERY_KEYS.GET_NOTIFICATIONS, variables.userId],
          () => []
        );
      },
      onError: () => {},
    }
  );
};
