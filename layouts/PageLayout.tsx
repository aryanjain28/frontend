import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { useState } from "react";
import AppBarComponent from "./AppBarComponent";
import DrawerComponent, { DrawerHeader } from "./DrawerComponent";

export default function PageLayout({
  showLayout = true,
  children,
}: {
  showLayout?: boolean;
  children: any;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {showLayout && (
        <>
          <AppBarComponent open={open} setOpen={() => setOpen(true)} />
          <DrawerComponent open={open} setOpen={() => setOpen(false)} />
        </>
      )}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {showLayout && <DrawerHeader />}
        {children}
      </Box>
    </Box>
  );
}
