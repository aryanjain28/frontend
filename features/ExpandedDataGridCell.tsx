import { Row } from "../types/datagrid.types";
import ExpandedTaskGridCell from "./ExpandedTaskGridCell";

const Main = (props: { row: Row; open: boolean; colSpan: number }) => {
  return <ExpandedTaskGridCell {...props} />;
};

export default Main;
