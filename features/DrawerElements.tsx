import {
  Box,
  Collapse,
  Drawer as MUIDrawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/router";
import { MouseEvent } from "react";
import { palette } from "../styles/theme";
import {
  closedMixin,
  drawerElements,
  drawerWidth,
  openedMixin,
} from "../utils/drawer.utils";

export const Drawer = styled(MUIDrawer, {
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

export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export const Children = ({
  parentIndex,
  isPopover = false,
}: {
  parentIndex: number;
  isPopover?: boolean;
}) => {
  const router = useRouter();
  return (
    <>
      {(drawerElements[parentIndex]?.children || []).map(
        (
          {
            label,
            icon,
            route,
            hidden,
          }: { label: string; icon: any; route: string; hidden: boolean },
          index: number
        ) =>
          !hidden && (
            <List key={`${label}_${index}`} disablePadding>
              <Box
                sx={{
                  ...(isPopover && {
                    p: 1,
                    borderBottom: `1px ${palette.primary.main} solid`,
                  }),
                  ...(router.pathname === route || isPopover
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
                  sx={{ ...(!isPopover && { pl: 4 }) }}
                  onClick={() => router.push(route)}
                >
                  <ListItemIcon
                    sx={{
                      color:
                        router.pathname === route || isPopover
                          ? palette.primary.white
                          : palette.neutral.main,
                    }}
                  >
                    {isPopover ? (
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        {icon}
                        <Typography sx={{ fontSize: 15, mx: 1 }}>
                          {label}
                        </Typography>
                      </Box>
                    ) : (
                      icon
                    )}
                  </ListItemIcon>
                  {!isPopover && <ListItemText primary={label} />}
                </ListItemButton>
              </Box>
            </List>
          )
      )}
    </>
  );
};

export const PopoverBox = ({
  parentIndex,
  popoverEnter,
  popoverLeave,
}: {
  parentIndex: number;
  popoverEnter: (
    e: MouseEvent<HTMLElement>,
    parentIndex: number,
    isIcon: boolean
  ) => void;
  popoverLeave: (e: MouseEvent<HTMLElement>, isIcon: boolean) => void;
}) => {
  const { label: head } = drawerElements[parentIndex];
  return (
    <Box
      sx={{ pointerEvents: "auto", background: palette.primary.main }}
      width={200}
      pb={5}
      onMouseEnter={(e) => popoverEnter(e, parentIndex, false)}
      onMouseLeave={(e) => popoverLeave(e, false)}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        width="100%"
        height="15%"
        py={2}
      >
        <Typography
          fontSize={13}
          letterSpacing={2}
          color={palette.primary.white}
          fontWeight={500}
        >
          {head.toUpperCase()}
        </Typography>
      </Box>
      <Box>
        <Children parentIndex={parentIndex} isPopover />
      </Box>
    </Box>
  );
};
