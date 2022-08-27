import MuiDrawer from "@mui/material/Drawer";
import { makeStyles } from "@material-ui/core/styles";
import { styled, Theme, CSSObject } from "@mui/material/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { MouseEvent, useState } from "react";
import {
  Collapse,
  Divider,
  Grid,
  IconButton,
  Popover,
  Typography,
  Zoom,
} from "@mui/material";
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

const PopoverBox = ({
  popoverEnter,
  popoverLeave,
}: {
  popoverEnter: (e: MouseEvent<HTMLElement>, isIcon: boolean) => void;
  popoverLeave: (e: MouseEvent<HTMLElement>, isIcon: boolean) => void;
}) => (
  <Box
    sx={{ pointerEvents: "auto", background: palette.primary.main }}
    width={200}
    height={400}
    onMouseEnter={(e) => popoverEnter(e, false)}
    onMouseLeave={(e) => popoverLeave(e, false)}
  ></Box>
);

const DrawerComponent = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: () => void;
}) => {
  const router = useRouter();
  const [openParentId, setOpenParentId] = useState<number | null>(-1);
  const [anchorEl, setAnchorE1] = useState<EventTarget | null>(null);
  const [openedPopover, setOpenedPopover] = useState(false);

  const useStyles = makeStyles((theme) => ({
    popover: {
      pointerEvents: "none",
    },
    popoverContent: {
      pointerEvents: "auto",
      borderRadius: 20,
    },
  }));

  const classes = useStyles();

  const popoverLeave = (e: MouseEvent<HTMLElement>, isIcon = true) => {
    if (isIcon) setAnchorE1(null);
    setOpenedPopover(false);
  };
  const popoverEnter = (e: MouseEvent<HTMLElement>, isIcon = true) => {
    setAnchorE1(anchorEl);
    if (isIcon) {
      setAnchorE1(e.currentTarget);
    }
    setOpenedPopover(true);
  };

  return (
    <>
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
                  aria-owns={openedPopover ? "mouse-over-popover" : undefined}
                  onMouseEnter={
                    !open && children.length > 0 ? popoverEnter : () => {}
                  }
                  onMouseLeave={
                    !open && children.length > 0 ? popoverLeave : () => {}
                  }
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
                        <Grid
                          container
                          direction="column"
                          alignItems="center"
                          justifyContent="center"
                        >
                          {icon}
                          <Typography
                            display={open ? "none" : undefined}
                            fontSize={7}
                            fontWeight={700}
                          >
                            {`${label}`.toUpperCase()}
                          </Typography>
                        </Grid>
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

      <Popover
        id="mouse-over-popover"
        className={classes.popover}
        classes={{ paper: classes.popoverContent }}
        open={openedPopover}
        anchorEl={anchorEl as Element}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        disableRestoreFocus
        transitionDuration={100}
        TransitionComponent={Zoom}
      >
        <PopoverBox popoverEnter={popoverEnter} popoverLeave={popoverLeave} />
      </Popover>
    </>
  );
};

export default DrawerComponent;
