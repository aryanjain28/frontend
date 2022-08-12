export const useGetLocalStorage = () => {
  let storage: {
    accessToken: string | null;
    userId: string | null;
    fullName: string;
    role: string;
  } = {
    accessToken: null,
    userId: null,
    fullName: "",
    role: "",
  };
  if (typeof window !== "undefined") {
    storage.userId = localStorage.getItem("user_id") || null;
    storage.accessToken = localStorage.getItem("access_token") || null;
    storage.fullName = localStorage.getItem("fullname") || "";
    storage.role = localStorage.getItem("role") || "";
  }
  return storage;
};
