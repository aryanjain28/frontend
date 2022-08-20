import { Row } from "../types/datagrid.types";
import { useRouter } from "next/router";
import { ROUTES } from "../constants/routes";
import ExpandedTaskGridCell from "./ExpandedTaskGridCell";
import ExpandedClientGridCell from "./ExpandedClientGridCell";

const Main = (props: { row: Row; open: boolean; colSpan: number }) => {
  const router = useRouter();
  const isTypeTask = router.pathname.includes(ROUTES.tasks);
  if (isTypeTask) {
    return <ExpandedTaskGridCell {...props} />;
  } else {
    return <ExpandedClientGridCell {...props} />;
  }
};

export default Main;
