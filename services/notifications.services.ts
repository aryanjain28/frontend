import { API_ROUTES } from "../constants/routes";
import {
  GetNotificationsResponse,
  PatchNotificationsResponse,
} from "../types/notifications.types";
import { createRoute } from "../utils/routes";
import { GET, PATCH } from "./api";

export const getNotifications = (userId: string) => {
  const url = createRoute(API_ROUTES.GET_NOTIFICATIONS, { userId });
  return GET<undefined, GetNotificationsResponse>(url).then((res) => res.data);
};

export const removeNotifications = (userId: string) => {
  const url = createRoute(API_ROUTES.REMOVE_NOTIFICATIONS, { userId });
  return PATCH<undefined, PatchNotificationsResponse>(url, undefined).then(
    (res) => res
  );
};
