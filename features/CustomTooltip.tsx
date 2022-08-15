import {
  Fade,
  styled,
  Tooltip,
  tooltipClasses,
  TooltipProps,
} from "@mui/material";

export const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip
    {...props}
    classes={{ popper: className }}
    placement="left"
    TransitionComponent={Fade}
  />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    fontSize: "14px",
    border: "1px solid black",
  },
}));
