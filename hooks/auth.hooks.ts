export const useGetLocalStorage = () => {
  let storage: {
    accessToken: string | null;
    userId: string | null;
    fullName: string;
    email: string;
    role: string;
  } = {
    accessToken: null,
    userId: null,
    fullName: "",
    email: "",
    role: "",
  };
  if (typeof window !== "undefined") {
    storage.userId = localStorage.getItem("user_id") || null;
    storage.accessToken = localStorage.getItem("access_token") || null;
    storage.fullName = localStorage.getItem("fullname") || "";
    storage.email = localStorage.getItem("email") || "";
    storage.role = localStorage.getItem("role") || "";
  }
  return storage;
};
