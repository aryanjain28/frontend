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
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import AddTaskIcon from "@mui/icons-material/PlaylistAddOutlined";
import { useState } from "react";
import { Collapse } from "@mui/material";
import { useGetLocalStorage } from "../hooks/auth.hooks";

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
  const [openNestedChild, setOpenNestedChild] = useState(false);
  const { role } = useGetLocalStorage();

  const drawerElements = [
    {
      label: "Dashboard",
      icon: <DashboardIcon />,
      route: ROUTES.dashboard,
      children: [],
      hidden: false,
    },
    {
      label: "My Firm",
      icon: <MyFirmIcon />,
      route: ROUTES.myFirm,
      children: [],
      hidden: false,
    },
    {
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
      label: "GST Invoice",
      icon: <GstInvoiceIcon />,
      route: ROUTES.gstInvoice,
      children: [],
      hidden: false,
    },
    {
      label: "Client Master",
      icon: <ClientsIcon />,
      route: ROUTES.clients,
      children: [],
      hidden: false,
    },
    {
      label: "HR",
      icon: <HrIcon />,
      route: ROUTES.hr,
      children: [],
      hidden: false,
    },
    {
      label: "Links",
      icon: <LinksIcon />,
      route: ROUTES.links,
      children: [],
      hidden: false,
    },
    {
      label: "Settings",
      icon: <SettingsIcon />,
      route: ROUTES.settings,
      children: [],
      hidden: false,
    },
    {
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
          ({ label, icon, route, children, hidden }, index) => {
            const isSelected = router.pathname.includes(route);
            return (
              <Box
                key={`${label}_${index}`}
                sx={{
                  ...(isSelected && { bgcolor: "#1e2746", color: "#ffffff" }),
                }}
              >
                <ListItem
                  key={label}
                  disablePadding
                  sx={{ display: "block" }}
                  onClick={() =>
                    children.length < 1
                      ? router.push(route)
                      : setOpenNestedChild(!openNestedChild)
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
                        ...(isSelected && { color: "#ffffff" }),
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
                      (openNestedChild ? <ExpandLess /> : <ExpandMore />)}
                  </ListItemButton>
                  {
                    <Collapse in={openNestedChild} timeout="auto" unmountOnExit>
                      {children.map(
                        ({ label, icon, route, hidden }, index) =>
                          !hidden && (
                            <List key={`${label}_${index}`} disablePadding>
                              <Box
                                sx={{
                                  ...(router.pathname === route
                                    ? {
                                        color: "white",
                                        bgcolor: "#485d8c",
                                      }
                                    : { color: "black", bgcolor: "white" }),
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
                                          ? "white"
                                          : "#757575",
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
