import MyTasksIcon from "@mui/icons-material/AssignmentInd";
import PendingIcon from "@mui/icons-material/PendingActionsOutlined";
import ProgressIcon from "@mui/icons-material/MovingOutlined";
import CompletedIcon from "@mui/icons-material/CheckOutlined";
import OverdueIcon from "@mui/icons-material/RunningWithErrorsOutlined";
import ApprovedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import PendingTaskIcon from "@mui/icons-material/PendingActions";
import ApprovedTaskIcon from "@mui/icons-material/Grading";
import CompletedTaskIcon from "@mui/icons-material/Done";
import { ROUTES } from "../constants/routes";
import { Task } from "../types/task.types";
import { ColumnG } from "../types/datagrid.types";
import { Link, Tooltip, Typography } from "@mui/material";
import { formatTime, formatTime2 } from "./common.utils";
import { KeyboardArrowDown } from "@mui/icons-material";
import { CustomTooltip } from "../features/CustomTooltip";

export const tasks = [
  {
    label: "My Tasks",
    count: 42,
    icon: <MyTasksIcon fontSize="large" />,
    route: ROUTES.tasks,
  },
  {
    label: "Pending",
    count: 420,
    icon: <PendingIcon fontSize="large" />,
  },
  {
    label: "In Progress",
    count: 13,
    icon: <ProgressIcon fontSize="large" />,
  },
  {
    label: "Completed",
    count: 151,
    icon: <CompletedIcon fontSize="large" />,
  },
  {
    label: "Overdue",
    count: 13,
    icon: <OverdueIcon fontSize="large" />,
  },
  {
    label: "Approved",
    count: 19,
    icon: <ApprovedIcon fontSize="large" />,
  },
];

export const taskStatus = {
  PENDING: {
    label: "PENDING",
    icon: (
      <Tooltip title={"Pending"} arrow>
        <PendingTaskIcon />
      </Tooltip>
    ),
    color: "#f70000",
  },
  APPROVED: {
    label: "APPROVED",
    icon: (
      <Tooltip title={"Approved"} arrow>
        <ApprovedTaskIcon />
      </Tooltip>
    ),
    color: "#188050",
  },
  COMPLETED: {
    label: "COMPLETED",
    icon: (
      <Tooltip title={"Completed"} arrow>
        <CompletedTaskIcon />
      </Tooltip>
    ),
    color: "#f4891e",
  },
};

export const getTasksCol = (): ColumnG<Task>[] => [
  {
    headerName: "Create Date",
    key: "createdAt",
    Component: ({ row }) => {
      return <Typography>{formatTime2(row.createdAt)}</Typography>;
    },
  },
  {
    headerName: "Client",
    key: "client.clientName",
    Component: ({ row }) => {
      return <Typography>{row.client.clientName}</Typography>;
    },
  },
  {
    headerName: "Entity",
    key: "client.entity",
    Component: ({ row }) => {
      return <Typography>{row.client.entity}</Typography>;
    },
  },
  {
    headerName: "Task Name",
    key: "name",
    Component: ({ row }) => {
      return (
        <CustomTooltip title={row.name}>
          <Typography maxWidth="250px" noWrap>
            {row.name}
          </Typography>
        </CustomTooltip>
      );
    },
  },
  {
    headerName: "Assignee",
    key: "assignee",
    Component: ({ row: { assignee } }) => {
      return (
        <Typography maxWidth="200px" noWrap>
          {`${assignee.fName}`}
        </Typography>
      );
    },
  },
  {
    headerName: "Status",
    key: "status",
    Component: ({ row }) => {
      return taskStatus[row.status].icon;
    },
  },
  {
    headerName: "Total",
    key: "totalAmount",
  },
  {
    headerName: "Paid",
    key: "paidAmount",
  },
  {
    headerName: "Balance",
    key: "balanceAmount",
  },
  {
    headerName: "Start Date",
    key: "taskStartDate",
    Component: ({ row }) => {
      return <Typography>{formatTime2(row.startDate)}</Typography>;
    },
  },
  {
    headerName: "End Date",
    key: "taskEndDate",
    Component: ({ row }) => {
      return <Typography>{formatTime2(row.endDate!)}</Typography>;
    },
  },
  // {
  //   headerName: "",
  //   key: "",
  //   Component: ({ row }) => {
  //     return <KeyboardArrowDown />;
  //   },
  // },
];

export const getMyTasksColumns = (): ColumnG<Task>[] => [
  {
    headerName: "Create Date",
    key: "createdAt",
    Component: ({ row }) => {
      return <Typography>{formatTime2(row.createdAt)}</Typography>;
    },
  },
  {
    headerName: "Client",
    key: "client.clientName",
    Component: ({ row }) => {
      return <Typography>{row.client.clientName}</Typography>;
    },
  },
  {
    headerName: "Entity",
    key: "client.entity",
    Component: ({ row }) => {
      return <Typography>{row.client.entity}</Typography>;
    },
  },
  {
    headerName: "Task Name",
    key: "name",
    Component: ({ row }) => {
      return (
        <CustomTooltip title={row.name}>
          <Link href="#">
            <Typography maxWidth="250px" noWrap>
              {row.name}
            </Typography>
          </Link>
        </CustomTooltip>
      );
    },
  },
  {
    headerName: "Status",
    key: "status",
    Component: ({ row }) => {
      return taskStatus[row.status].icon;
    },
  },
  {
    headerName: "Total",
    key: "totalAmount",
  },
  {
    headerName: "Paid",
    key: "paidAmount",
  },
  {
    headerName: "Balance",
    key: "balanceAmount",
  },
  {
    headerName: "Start Date",
    key: "taskStartDate",
    Component: ({ row }) => {
      return <Typography>{formatTime2(row.startDate)}</Typography>;
    },
  },
  {
    headerName: "End Date",
    key: "taskEndDate",
    Component: ({ row }) => {
      return <Typography>{formatTime2(row.endDate!)}</Typography>;
    },
  },
  // {
  //   headerName: "",
  //   key: "",
  //   Component: ({ row }) => {
  //     return <KeyboardArrowDown />;
  //   },
  // },
];
