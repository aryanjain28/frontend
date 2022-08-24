import { CircularProgress } from "@mui/material";
import { palette } from "../styles/theme";

export const Loader = () => (
  <CircularProgress size={25} sx={{ color: palette.primary.light, my: 10 }} />
);
