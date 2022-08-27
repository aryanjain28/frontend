import { makeStyles } from "@material-ui/core/styles";
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
import {
  Children,
  Drawer,
  DrawerHeader,
  PopoverBox,
} from "../features/DrawerElements";

const DrawerComponent = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: () => void;
}) => {
  const router = useRouter();
  const [openParentId, setOpenParentId] = useState<number | null>(-1);
  const [parentIndex, setParentIndex] = useState<number>(-1);
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

  const popoverEnter = (
    e: MouseEvent<HTMLElement>,
    parentIndex: number,
    isIcon = true
  ) => {
    setAnchorE1(anchorEl);
    if (isIcon) {
      setAnchorE1(e.currentTarget);
    }
    setOpenedPopover(true);
    setParentIndex(parentIndex);
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
                    !open && children.length > 0
                      ? (e) => popoverEnter(e, index)
                      : () => {}
                  }
                  onMouseLeave={
                    !open && children.length > 0 ? popoverLeave : () => {}
                  }
                >
                  <ListItem
                    key={label}
                    disablePadding
                    sx={{ display: "block" }}
                    onClick={() => {
                      setParentIndex(index);
                      children.length < 1
                        ? router.push(route)
                        : setOpenParentId(
                            openParentId === parentId ? -1 : parentId
                          );
                    }}
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
                            fontSize={8}
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
                    <Collapse
                      in={open && parentId === openParentId}
                      timeout="auto"
                      unmountOnExit
                    >
                      <Children parentIndex={parentIndex} />
                    </Collapse>
                  </ListItem>
                </Box>
              );
            }
          )}
        </List>
      </Drawer>

      {parentIndex > -1 && (
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
          transitionDuration={0}
          TransitionComponent={Zoom}
        >
          <PopoverBox
            parentIndex={parentIndex}
            popoverEnter={popoverEnter}
            popoverLeave={popoverLeave}
          />
        </Popover>
      )}
    </>
  );
};

export default DrawerComponent;
