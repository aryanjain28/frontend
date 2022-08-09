import { useRouter } from "next/router";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { en } from "../constants/labels";
import { ROUTES } from "../constants/routes";

export default function Custom404() {
  const router = useRouter();

  useEffect(() => {
    toast.error(en.toast.custom404Error);
    router.push(ROUTES.dashboard);
  }, [router]);

  return null;
}
