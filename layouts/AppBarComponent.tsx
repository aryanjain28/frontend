import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ListItemIcon from "@mui/material/ListItemIcon";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { en } from "../constants/labels";
import {
  AccountCircle,
  Logout,
  Notifications,
  Settings,
} from "@mui/icons-material";
import {
  Badge,
  Grid,
  Icon,
  Menu,
  MenuItem,
  MenuProps,
  Tooltip,
} from "@mui/material";
import { toast } from "react-toastify";
import { ROUTES } from "../constants/routes";
import { useRouter } from "next/router";
import { SvgIcon } from "./PageLayout";
import { useGetLocalStorage } from "../hooks/auth.hooks";
import { formatTime } from "../utils/common.utils";
import { taskStatus } from "../utils/tasks.utils";
import { MyTasks } from "../types/task.types";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const AppBarComponent = ({
  open,
  setOpen,
}: {
  open: Boolean;
  setOpen: () => void;
}) => {
  const router = useRouter();
  const { fullName } = useGetLocalStorage();

  const [anchorEl, setAnchorEl] = useState<MenuProps["anchorEl"] | null>(null);
  const [anchorNot, setAnchorNot] = useState<MenuProps["anchorEl"] | null>(
    null
  );

  const handleLogout = useCallback(() => {
    localStorage.setItem("access_token", "");
    localStorage.setItem("user_id", "");
    localStorage.setItem("role", "");
    localStorage.setItem("email", "");
    localStorage.setItem("fullname", "");
    toast.success(en.toast.successLogout);
    router.push(ROUTES.login);
  }, []);

  const newNotifications: MyTasks[] = []; // TODO: Add notifications arr to DB

  return (
    <>
      <AppBar color="default" position="fixed" open={open as boolean}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={setOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            width={"100%"}
          >
            <Box width="35px" height="35px" sx={{ cursor: "pointer" }}>
              <SvgIcon
                onClick={() => router.push(ROUTES.dashboard)}
                src="/images/CALogo.svg"
                sx={{ maxWidth: "100%" }}
                alt="Home"
              />
            </Box>

            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              gap={2}
            >
              <Typography>{fullName}</Typography>
              <IconButton
                size="small"
                color="inherit"
                onClick={(e) => setAnchorNot(e.currentTarget)}
              >
                <Badge badgeContent={newNotifications?.length} color="error">
                  <Notifications />
                </Badge>
              </IconButton>
              <IconButton
                size="small"
                edge="end"
                aria-haspopup="true"
                onClick={(e) => setAnchorEl(e.currentTarget)}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        onClick={() => setAnchorEl(null)}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          {en.settings}
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          {en.logout}
        </MenuItem>
      </Menu>

      <Menu
        anchorEl={anchorNot}
        open={Boolean(anchorNot)}
        onClose={() => setAnchorNot(null)}
        onClick={() => setAnchorNot(null)}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {/* {newNotifications?.map((notif: any, index: number) => {
          const status =
            taskStatus[notif.status as "PENDING" | "APPROVED" | "COMPLETED"];
          return (
            <MenuItem
              key={index}
              onClick={() =>
                router.push(
                  `${ROUTES.myTasks}/?status=${status.label}&taskId=${notif.id}`
                )
              }
            >
              <Grid
                container
                direction="row"
                alignItems="center"
                justifyContent="center"
                xs={12}
                width="400px"
                pb={1}
                borderBottom="1px #dadada solid"
              >
                <Grid
                  container
                  direction="column"
                  justifyContent="space-evenly"
                  alignItems="center"
                  xs={2}
                >
                  {status.icon}
                </Grid>
                <Grid
                  xs={10}
                  container
                  direction="column"
                  alignItems="flex-start"
                  justifyContent="space-evenly"
                >
                  <Typography variant="caption">
                    {`${notif.assignedByFName || ""} ${
                      notif.assignedByLName || ""
                    } (${formatTime(notif.assignedAt as Date)})`}
                  </Typography>
                  <Typography mt={0.5} variant="body2" maxWidth={"100%"} noWrap>
                    {notif.name}
                  </Typography>
                </Grid>
              </Grid>
            </MenuItem>
          );
        })} */}
        <MenuItem>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="100%"
          >
            <Typography color="GrayText">
              {newNotifications?.length > 0
                ? "Show All Notifications"
                : "No New Notification"}
            </Typography>
          </Box>
        </MenuItem>
      </Menu>
    </>
  );
};

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

export default AppBarComponent;
