import DashboardIcon from "@mui/icons-material/GridViewOutlined";
import MyFirmIcon from "@mui/icons-material/BusinessOutlined";
import AllTasksIcon from "@mui/icons-material/DescriptionOutlined";
import GstInvoiceIcon from "@mui/icons-material/LibraryBooksOutlined";
import ClientsIcon from "@mui/icons-material/PeopleAltOutlined";
import HrIcon from "@mui/icons-material/FeedOutlined";
import LinksIcon from "@mui/icons-material/LinkOutlined";
import SettingsIcon from "@mui/icons-material/SettingsOutlined";
import ReportsIcon from "@mui/icons-material/EqualizerOutlined";
import MyTaskIcon from "@mui/icons-material/ContactPageOutlined";
import MessageIcon from "@mui/icons-material/Message";
import MessageHistoryIcon from "@mui/icons-material/ForumOutlined";
import SendMessageIcon from "@mui/icons-material/SendOutlined";
import { PeopleAltOutlined } from "@mui/icons-material";
import AddTaskIcon from "@mui/icons-material/PlaylistAddOutlined";
import AddTaskTypeIcon from "@mui/icons-material/LibraryAddOutlined";
import { ROUTES } from "../constants/routes";
import { isAdmin, isStaff } from "./common.utils";

export const drawerElements = [
  {
    id: 1,
    label: "Dashboard",
    icon: <DashboardIcon />,
    route: ROUTES.dashboard,
    children: [],
    hidden: false,
  },
  {
    id: 2,
    label: "My Firm",
    icon: <MyFirmIcon />,
    route: ROUTES.myFirm,
    children: [],
    hidden: false,
  },
  {
    id: 3,
    label: "Tasks",
    icon: <AllTasksIcon />,
    route: ROUTES.tasks,
    children: [
      {
        label: "Create Task",
        icon: <AddTaskIcon />,
        route: ROUTES.createTask,
        hidden: isStaff(),
      },
      {
        label: "Create Task Type",
        icon: <AddTaskTypeIcon />,
        route: ROUTES.taskTypes,
        hidden: false,
      },
      {
        label: "All Tasks",
        icon: <AllTasksIcon />,
        route: ROUTES.tasks,
        hidden: false,
      },
      {
        label: "My Tasks",
        icon: <MyTaskIcon />,
        route: ROUTES.myTasks,
        hidden: isAdmin(),
      },
    ],
  },
  {
    id: 4,
    label: "GST Invoice",
    icon: <GstInvoiceIcon />,
    route: ROUTES.gstInvoice,
    children: [],
    hidden: false,
  },
  {
    id: 5,
    label: "Clients",
    icon: <ClientsIcon />,
    route: ROUTES.clients,
    children: [
      {
        label: "Add New Client",
        icon: <AddTaskIcon />,
        route: ROUTES.createClient,
        hidden: false,
      },
      {
        label: "View Clients",
        icon: <PeopleAltOutlined />,
        route: ROUTES.clients,
        hidden: false,
      },
    ],
    hidden: false,
  },
  {
    id: 6,
    label: "Messages",
    icon: <MessageIcon />,
    route: ROUTES.messages,
    children: [
      {
        label: "Messages Sent",
        icon: <MessageHistoryIcon />,
        route: ROUTES.messagesSent,
        hidden: false,
      },
      {
        label: "Send Message",
        icon: <SendMessageIcon />,
        route: ROUTES.messagesSend,
        hidden: false,
      },
    ],
    hidden: false,
  },
  {
    id: 7,
    label: "HR",
    icon: <HrIcon />,
    route: ROUTES.hr,
    children: [],
    hidden: false,
  },
  {
    id: 8,
    label: "Links",
    icon: <LinksIcon />,
    route: ROUTES.links,
    children: [],
    hidden: false,
  },
  {
    id: 9,
    label: "Settings",
    icon: <SettingsIcon />,
    route: ROUTES.settings,
    children: [],
    hidden: false,
  },
  {
    id: 10,
    label: "Reports",
    icon: <ReportsIcon />,
    route: ROUTES.reports,
    children: [],
    hidden: false,
  },
];
