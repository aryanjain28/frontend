export const useGetLocalStorage = () => {
  let storage: {
    accessToken: string | null;
    userId: string | null;
    fullName: string;
  } = {
    accessToken: null,
    userId: null,
    fullName: "",
  };
  if (typeof window !== "undefined") {
    storage.userId = localStorage.getItem("user_id") || null;
    storage.accessToken = localStorage.getItem("access_token") || null;
    storage.fullName = localStorage.getItem("fullname") || "";
  }
  return storage;
};
