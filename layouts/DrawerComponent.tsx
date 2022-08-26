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
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useState } from "react";
import { Collapse } from "@mui/material";
import { palette } from "../styles/theme.js";
import { drawerElements } from "../utils/drawer.utils";

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
  const [openParentId, setOpenParentId] = useState<number>(-1);

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
          (
            { id: parentId, label, icon, route, children = [], hidden },
            index
          ) => {
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
                          openParentId === parentId ? -1 : parentId
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
