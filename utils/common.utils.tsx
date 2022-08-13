import moment from "moment";
import { useGetLocalStorage } from "../hooks/auth.hooks";

export const formatTime = (timestamp: string) => {
  return timestamp
    ? moment(timestamp).format("MMMM Do, h:mm a")
    : "Invalid Date";
};

export const formatTime2 = (timestamp: Date | string) => {
  return timestamp ? moment(timestamp).format("DD/MM/YYYY") : null;
};

export const getNestedObjValue = (
  obj: { [key: string]: any },
  key: string
): any => {
  try {
    let temp2 = obj;
    key.split(".").forEach((t: string) => (temp2 = temp2[t as string]));
    return temp2;
  } catch (error) {
    console.error("Error: ", error);
    return null;
  }
};

export const isAdmin = () => {
  const { role } = useGetLocalStorage();
  return role === "ADMIN";
};

export const isStaff = () => {
  const { role } = useGetLocalStorage();
  return role === "STAFF";
};

export const colors = [
  "primary",
  "default",
  "secondary",
  "error",
  "info",
  "success",
  "warning",
];
