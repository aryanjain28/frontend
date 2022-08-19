import { styled, Theme, CSSObject } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
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
import { ROUTES } from "../constants/routes";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import { ExpandLess, ExpandMore, PeopleAltOutlined } from "@mui/icons-material";
import AddTaskIcon from "@mui/icons-material/PlaylistAddOutlined";
import { useState } from "react";
import { Collapse, Tooltip } from "@mui/material";
import { useGetLocalStorage } from "../hooks/auth.hooks";
import { palette } from "../styles/theme.js";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const DrawerComponent = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: () => void;
}) => {
  const router = useRouter();
  const [openParentId, setOpenParentId] = useState<number | null>(-1);
  const { role } = useGetLocalStorage();

  const drawerElements = [
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
          hidden: role === "STAFF",
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
          hidden: role === "ADMIN",
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
      label: "HR",
      icon: <HrIcon />,
      route: ROUTES.hr,
      children: [],
      hidden: false,
    },
    {
      id: 7,
      label: "Links",
      icon: <LinksIcon />,
      route: ROUTES.links,
      children: [],
      hidden: false,
    },
    {
      id: 8,
      label: "Settings",
      icon: <SettingsIcon />,
      route: ROUTES.settings,
      children: [],
      hidden: false,
    },
    {
      id: 9,
      label: "Reports",
      icon: <ReportsIcon />,
      route: ROUTES.reports,
      children: [],
      hidden: false,
    },
  ];

  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader>
        <IconButton
          onClick={setOpen}
          sx={{ ...(!open && { display: "none" }) }}
        >
          <ChevronLeftIcon />
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {drawerElements.map(
          ({ id: parentId, label, icon, route, children, hidden }, index) => {
            const isSelected = router.pathname.includes(route);
            return (
              <Box
                key={`${label}_${index}`}
                sx={{
                  ...(isSelected && {
                    bgcolor: palette.primary.main,
                    color: palette.primary.white,
                  }),
                }}
              >
                <ListItem
                  key={label}
                  disablePadding
                  sx={{ display: "block" }}
                  onClick={() =>
                    children.length < 1
                      ? router.push(route)
                      : setOpenParentId(
                          openParentId === parentId ? null : parentId
                        )
                  }
                >
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                        ...(isSelected && { color: palette.primary.white }),
                      }}
                    >
                      {icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={label}
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                    {open &&
                      children.length > 0 &&
                      (parentId === openParentId ? (
                        <ExpandLess />
                      ) : (
                        <ExpandMore />
                      ))}
                  </ListItemButton>
                  {
                    <Collapse
                      in={parentId === openParentId}
                      timeout="auto"
                      unmountOnExit
                    >
                      {children.map(
                        ({ label, icon, route, hidden }, index) =>
                          !hidden && (
                            <List key={`${label}_${index}`} disablePadding>
                              <Box
                                sx={{
                                  ...(router.pathname === route
                                    ? {
                                        color: palette.primary.white,
                                        bgcolor: palette.secondary.main,
                                      }
                                    : {
                                        color: palette.primary.black,
                                        bgcolor: palette.primary.white,
                                      }),
                                }}
                              >
                                <ListItemButton
                                  sx={{ pl: 4 }}
                                  onClick={() => router.push(route)}
                                >
                                  <ListItemIcon
                                    sx={{
                                      color:
                                        router.pathname === route
                                          ? palette.primary.white
                                          : palette.neutral.main,
                                    }}
                                  >
                                    {icon}
                                  </ListItemIcon>
                                  <ListItemText primary={label} />
                                </ListItemButton>
                              </Box>
                            </List>
                          )
                      )}
                    </Collapse>
                  }
                </ListItem>
              </Box>
            );
          }
        )}
      </List>
    </Drawer>
  );
};

export default DrawerComponent;
