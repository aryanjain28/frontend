import { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { CircularProgress, CssBaseline } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Router, { useRouter } from "next/router";
import { API_ROUTES, ROUTES } from "../constants/routes";
import { en } from "../constants/labels";
import React, { useEffect } from "react";
import nprogress from "nprogress";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

import "../styles/globals.css";
import "../styles/nprogress.css";

Router.events.on("routeChangeStart", nprogress.start);
Router.events.on("routeChangeComplete", nprogress.done);
Router.events.on("routeChangeError", nprogress.done);

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  },
});

const AuthWrapper: React.FC = ({ children }) => {
  const router = useRouter();

  let accessToken: string | null = null;
  const isLoginPage =
    ROUTES.login.includes(router.pathname) ||
    ROUTES.signUp.includes(router.pathname);

  if (typeof window !== "undefined") {
    accessToken = localStorage.getItem("access_token");
  }

  useEffect(() => {
    if (isLoginPage) {
      if (accessToken) {
        localStorage.setItem("access_token", "");
        localStorage.setItem("user_id", "");
        localStorage.setItem("role", "");
        localStorage.setItem("email", "");
        localStorage.setItem("fullname", "");
      }
    } else {
      // else we redirect user to login page to reauthenticate
      if (!accessToken) {
        toast.error(en.toast.authFailed);
        router.push(ROUTES.login);
      }
    }
  }, [isLoginPage, accessToken, router]);

  // If access-token is present we render the children
  if (accessToken || isLoginPage) {
    return <>{children}</>;
  }

  return <CircularProgress />;
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <CssBaseline />
        <ToastContainer position="top-center" theme="dark" />
        <AuthWrapper>
          <Component {...pageProps} />
        </AuthWrapper>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
