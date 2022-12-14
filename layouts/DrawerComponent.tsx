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
import DayBookIcon from "@mui/icons-material/MenuBookOutlined";
import GstInvoiceIcon from "@mui/icons-material/LibraryBooksOutlined";
import ClientsIcon from "@mui/icons-material/PeopleAltOutlined";
import HrIcon from "@mui/icons-material/FeedOutlined";
import LinksIcon from "@mui/icons-material/LinkOutlined";
import SettingsIcon from "@mui/icons-material/SettingsOutlined";
import ReportsIcon from "@mui/icons-material/EqualizerOutlined";
import { ROUTES } from "../constants/routes";
import { Box } from "@mui/system";
import { useRouter } from "next/router";

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

  const drawerElements = [
    {
      label: "Dashboard",
      icon: <DashboardIcon />,
      route: ROUTES.dashboard,
      children: [],
    },
    {
      label: "My Firm",
      icon: <MyFirmIcon />,
      route: ROUTES.myFirm,
      children: [],
    },
    {
      label: "Daybook",
      icon: <DayBookIcon />,
      route: ROUTES.dayBook,
      children: [],
    },
    {
      label: "GST Invoice",
      icon: <GstInvoiceIcon />,
      route: ROUTES.gstInvoice,
      children: [],
    },
    {
      label: "Client Master",
      icon: <ClientsIcon />,
      route: ROUTES.clients,
      children: [],
    },
    { label: "HR", icon: <HrIcon />, route: ROUTES.hr, children: [] },
    { label: "Links", icon: <LinksIcon />, route: ROUTES.links, children: [] },
    {
      label: "Settings",
      icon: <SettingsIcon />,
      route: ROUTES.settings,
      children: [],
    },
    {
      label: "Reports",
      icon: <ReportsIcon />,
      route: ROUTES.reports,
      children: [],
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
        {drawerElements.map(({ label, icon, route }, index) => {
          const isSelected = router.pathname.includes(route);
          return (
            <Box
              sx={{
                ...(isSelected && { bgcolor: "#1e2746", color: "#ffffff" }),
              }}
            >
              <ListItem
                key={label}
                disablePadding
                sx={{ display: "block" }}
                onClick={() => router.push(route)}
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
                </ListItemButton>
              </ListItem>
            </Box>
          );
        })}
      </List>
    </Drawer>
  );
};

export default DrawerComponent;
