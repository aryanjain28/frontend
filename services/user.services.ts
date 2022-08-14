import { API_ROUTES } from "../constants/routes";
import {
  GetUserDetailsResponse,
  PostLoginUserPayload,
  PostUserPayload,
} from "../types/user.types";
import { createRoute } from "../utils/routes";
import { axiosInstance, GET, POST } from "./api";

export const postUser = (payload: PostUserPayload) => {
  const url = API_ROUTES.POST_USER;
  return axiosInstance.post(url, payload).then((res) => res.data);
};

export const loginUser = (payload: PostLoginUserPayload) => {
  const url = API_ROUTES.POST_LOGIN_USER;
  return axiosInstance.post(url, payload).then((res) => res.data);
};

export const getUserDetails = (userId: string) => {
  const url = createRoute(API_ROUTES.GET_USER_DETAILS, { userId });
  return GET<undefined, GetUserDetailsResponse>(url).then((res) => res.data);
};
