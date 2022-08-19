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
import { AllTasks, ModifiedTask, Task } from "../types/task.types";
import { ColumnG } from "../types/datagrid.types";
import { Link, Tooltip, Typography } from "@mui/material";
import { formatTime3, isAdmin, isStaff } from "./common.utils";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { CustomTooltip } from "../features/CustomTooltip";
import { en } from "../constants/labels";
import { palette } from "../styles/theme";

export const getTasksArr = () => [
  {
    label: isAdmin() ? en.allTasks : en.myTasks,
    count: 42,
    icon: <MyTasksIcon fontSize="large" />,
    route: isAdmin() ? ROUTES.tasks : ROUTES.myTasks,
  },
  {
    label: en.pending,
    count: 420,
    icon: <PendingIcon fontSize="large" />,
    route: `${isAdmin() ? ROUTES.tasks : ROUTES.myTasks}/?status=PENDING`,
  },
  {
    label: en.inProgress,
    count: 13,
    icon: <ProgressIcon fontSize="large" />,
    route: `${isAdmin() ? ROUTES.tasks : ROUTES.myTasks}/?status=INPROGRESS`,
  },
  {
    label: en.completed,
    count: 151,
    icon: <CompletedIcon fontSize="large" />,
    route: `${isAdmin() ? ROUTES.tasks : ROUTES.myTasks}/?status=COMPLETED`,
  },
  {
    label: en.overdue,
    count: 13,
    icon: <OverdueIcon fontSize="large" />,
    route: `${isAdmin() ? ROUTES.tasks : ROUTES.myTasks}/?status=OVERDUE`,
  },
  {
    label: en.approved,
    count: 19,
    icon: <ApprovedIcon fontSize="large" />,
    route: `${isAdmin() ? ROUTES.tasks : ROUTES.myTasks}/?status=APPROVED`,
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
    color: palette.primary.error,
  },
  APPROVED: {
    label: "APPROVED",
    icon: (
      <Tooltip title={"Approved"} arrow>
        <ApprovedTaskIcon />
      </Tooltip>
    ),
    color: palette.primary.success,
  },
  COMPLETED: {
    label: "COMPLETED",
    icon: (
      <Tooltip title={"Completed"} arrow>
        <CompletedTaskIcon />
      </Tooltip>
    ),
    color: palette.primary.warning,
  },
};

export const getTasksCol = (
  expandedRowId: string | null,
  setExpandedRowId: (id: string | null) => void
): ColumnG<ModifiedTask>[] => [
  {
    headerName: "Create Date",
    key: "createdAt",
    Component: ({ row }) => {
      return (
        <Typography maxWidth="100px" noWrap>
          {formatTime3(row.createdAt) || "NA"}
        </Typography>
      );
    },
  },
  {
    headerName: "Client",
    key: "clientName",
    Component: ({ row }) => {
      return (
        <Typography maxWidth="100px" noWrap>
          {row.clientName}
        </Typography>
      );
    },
  },
  {
    headerName: "Entity",
    key: "clientEntity",
    Component: ({ row }) => {
      return <Typography noWrap>{row.clientEntity}</Typography>;
    },
  },
  {
    headerName: "Name",
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
    headerName: "Type",
    key: "type",
    Component: ({ row }) => {
      return (
        <CustomTooltip title={row.taskTypeName}>
          <Typography maxWidth="250px" noWrap>
            {row.taskTypeName}
          </Typography>
        </CustomTooltip>
      );
    },
  },
  {
    headerName: "Assignee",
    key: "assigneeFName",
    Component: ({ row }) => {
      return (
        <Typography maxWidth="200px" noWrap>
          {`${row.assigneeFName}`}
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
      return (
        <Typography maxWidth="100px" noWrap>
          {formatTime3(row.startDate) || "NA"}
        </Typography>
      );
    },
  },
  {
    headerName: "End Date",
    key: "taskEndDate",
    Component: ({ row }) => {
      return (
        <Typography maxWidth="100px" noWrap>
          {formatTime3(row.endDate!) || "NA"}
        </Typography>
      );
    },
  },
  {
    headerName: "",
    key: "",
    hidden: isStaff(),
    Component: ({ row }) => {
      return expandedRowId === row.id ? (
        <KeyboardArrowUp
          sx={{ mr: 1, cursor: "pointer" }}
          onClick={() => setExpandedRowId(null)}
        />
      ) : (
        <KeyboardArrowDown
          sx={{ mr: 1, cursor: "pointer" }}
          onClick={() => setExpandedRowId(row.id)}
        />
      );
    },
  },
];

export const getMyTasksColumns = (
  expandedRowId: string | null,
  setExpandedRowId: (id: string | null) => void
): ColumnG<ModifiedTask>[] => [
  {
    headerName: "Create Date",
    key: "createdAt",
    Component: ({ row }) => {
      return (
        <Typography maxWidth="100px" noWrap>
          {formatTime3(row.createdAt) || "NA"}
        </Typography>
      );
    },
  },
  {
    headerName: "Client",
    key: "client.clientName",
    Component: ({ row }) => {
      return <Typography>{row.clientName}</Typography>;
    },
  },
  {
    headerName: "Entity",
    key: "client.entity",
    Component: ({ row }) => {
      return <Typography>{row.clientEntity}</Typography>;
    },
  },
  {
    headerName: "Name",
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
    headerName: "Type",
    key: "type",
    Component: ({ row }) => {
      return (
        <CustomTooltip title={row.taskTypeName}>
          <Typography maxWidth="250px" noWrap>
            {row.taskTypeName}
          </Typography>
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
      return <Typography>{formatTime3(row.startDate) || "NA"}</Typography>;
    },
  },
  {
    headerName: "End Date",
    key: "taskEndDate",
    Component: ({ row }) => {
      return <Typography>{formatTime3(row.endDate!) || "NA"}</Typography>;
    },
  },
  {
    headerName: "",
    key: "",
    Component: ({ row }) => {
      return expandedRowId === row.id ? (
        <KeyboardArrowUp
          sx={{ mr: 1, cursor: "pointer" }}
          onClick={() => setExpandedRowId(null)}
        />
      ) : (
        <KeyboardArrowDown
          sx={{ mr: 1, cursor: "pointer" }}
          onClick={() => setExpandedRowId(row.id)}
        />
      );
    },
  },
];
