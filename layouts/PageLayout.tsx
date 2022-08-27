import { Toolbar } from "@mui/material";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { styled } from "@mui/system";
import { useEffect, useState } from "react";
import AppBarComponent from "./AppBarComponent";
import DrawerComponent from "./DrawerComponent";

export const SvgIcon = styled("img")({
  display: "flex",
  height: "inherit",
  width: "inherit",
});

export default function PageLayout({
  showLayout = true,
  children,
}: {
  showLayout?: boolean;
  children: any;
}) {
  const [open, setOpen] = useState(
    localStorage.getItem("drawer_state") === "1"
  );

  useEffect(() => {
    localStorage.setItem("drawer_state", open ? "1" : "0");
  }, [open]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {showLayout && (
        <>
          <AppBarComponent
            open={Boolean(Number(open))}
            setOpen={() => setOpen(!open)}
          />
          <DrawerComponent
            open={Boolean(Number(open))}
            setOpen={() => setOpen(!open)}
          />
        </>
      )}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {showLayout && <Toolbar />}
        {children}
      </Box>
    </Box>
  );
}
