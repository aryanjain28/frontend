import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import { QUERY_KEYS } from "../constants/queryKeys";
import {
  getUserDetails,
  getUsersInfo,
  loginUser,
  postUser,
} from "../services/user.services";
import { APIError } from "../types/common.types";
import { PostLoginUserPayload, PostUserPayload } from "../types/user.types";
import { useGetLocalStorage } from "./auth.hooks";

export const useLoginUser = () => {
  return useMutation(
    ({
      payload,
      callback,
    }: {
      payload: PostLoginUserPayload;
      callback: () => void;
    }) => {
      return loginUser(payload);
    },
    {
      onSuccess: (data, variables) => {
        toast.success(data.message);
        localStorage.setItem("drawer_state", "0");
        localStorage.setItem("access_token", data.data.token);
        localStorage.setItem("user_id", data.data.userId);
        localStorage.setItem("role", data.data.role);
        localStorage.setItem("email", data.data.email);
        localStorage.setItem(
          "fullname",
          `${data.data.fName} ${data.data.lName}`
        );
        variables.callback();
      },
      onError: (err: APIError) => {
        console.log(err.response.data.message);
        toast.error(err.response.data.message);
      },
    }
  );
};

export const usePostUser = () => {
  return useMutation(
    ({ payload }: { payload: PostUserPayload; callback: () => void }) => {
      return postUser(payload);
    },
    {
      onSuccess: (data, variables) => {
        toast.success(data.message);
        variables.callback();
      },
      onError: (err: APIError) => {
        console.log(err.response.data.message);
        toast.error(err.response.data.message);
      },
    }
  );
};

export const useGetUserDetails = () => {
  const { userId } = useGetLocalStorage();
  const { data, isLoading, isFetching } = useQuery(
    [QUERY_KEYS.GET_USER_DETAILS, userId],
    () => (userId ? getUserDetails(userId) : null),
    { placeholderData: null }
  );
  return { data, isLoading: isLoading || isFetching };
};

export const useGetAllUsersInfo = () => {
  const { data, isLoading, isFetching } = useQuery(
    [QUERY_KEYS.GET_USERS_INFO],
    () => getUsersInfo(),
    { placeholderData: [] }
  );
  const modifiedData = data?.map((d) => ({
    ...d,
    fullName: `${d.fName} ${d.lName}`,
  }));
  return { data, isLoading: isLoading || isFetching };
};
