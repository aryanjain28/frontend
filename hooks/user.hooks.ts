import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { loginUser, postUser } from "../services/user.services";
import { APIError } from "../types/common.types";
import { PostLoginUserPayload, PostUserPayload } from "../types/user.types";

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
        console.log(data);
        toast.success(data.message);
        localStorage.setItem("access_token", data.data.token);
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
