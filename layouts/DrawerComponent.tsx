import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import { MouseEvent, useState } from "react";
import { Popover, Toolbar, Zoom } from "@mui/material";
import { palette } from "../styles/theme.js";
import { drawerElements } from "../utils/drawer.utils";

const drawerWidth = 65;

const useStyles = makeStyles((theme) => ({
  popover: {
    pointerEvents: "none",
  },
  popoverContent: {
    pointerEvents: "auto",
    borderRadius: 20,
  },
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
  const [anchorEl, setAnchorE1] = useState<EventTarget | null>(null);
  const classes = useStyles();
  const [openedPopover, setOpenedPopover] = useState(true);

  const popoverEnter = (e: MouseEvent<HTMLElement>, isIcon = true) => {
    setAnchorE1(anchorEl);
    if (isIcon) {
      setAnchorE1(e.currentTarget);
    }
    setOpenedPopover(true);
  };

  const popoverLeave = (e: MouseEvent<HTMLElement>, isIcon = true) => {
    if (isIcon) setAnchorE1(null);
    setOpenedPopover(false);
  };

  return (
    <>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
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
                  onMouseEnter={popoverEnter}
                  onMouseLeave={popoverLeave}
                >
                  <ListItem
                    key={label}
                    disablePadding
                    sx={{ display: "block" }}
                  >
                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        justifyContent: "initial",
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          justifyContent: "center",
                          ...(isSelected && { color: palette.primary.white }),
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                    </ListItemButton>
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
