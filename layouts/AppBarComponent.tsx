import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ListItemIcon from "@mui/material/ListItemIcon";
import { useCallback, useState } from "react";
import { en } from "../constants/labels";
import { AccountCircle, Logout, Settings } from "@mui/icons-material";
import { Icon, Menu, MenuItem, MenuProps, Tooltip } from "@mui/material";
import { toast } from "react-toastify";
import { ROUTES } from "../constants/routes";
import { useRouter } from "next/router";
import { SvgIcon } from "./PageLayout";
import CALogo from "../public/images/CALogo.svg";

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
  const [anchorEl, setAnchorEl] = useState<MenuProps["anchorEl"] | null>(null);

  const handleLogout = useCallback(() => {
    localStorage.setItem("access_token", "");
    toast.success(en.toast.successLogout);
    router.push(ROUTES.login);
  }, []);

  return (
    <>
      <AppBar color="transparent" position="fixed" open={open as boolean}>
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

            {/* <IconButton size="small" color="inherit">
              <Badge badgeContent={12} color="error">
                <Notifications />
              </Badge>
            </IconButton> */}
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              gap={2}
            >
              <Typography>{"Aryan Jain"}</Typography>
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
    </>
  );
};

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

export default AppBarComponent;
