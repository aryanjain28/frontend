import { API_ROUTES } from "../constants/routes";
import {
  PostLoginUserPayload,
  PostLoginUserResponse,
  PostUserPayload,
  PostUserResponse,
} from "../types/user.types";
import { POST } from "./api";

export const postUser = (payload: PostUserPayload) => {
  const url = API_ROUTES.POST_USER;
  return POST<PostUserPayload, PostUserResponse>(url, payload).then(
    (res) => res
  );
};

export const loginUser = (payload: PostLoginUserPayload) => {
  const url = API_ROUTES.POST_LOGIN_USER;
  return POST<PostLoginUserPayload, PostLoginUserResponse>(url, payload).then(
    (res) => res
  );
};
