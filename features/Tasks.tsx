import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/material";
import { en } from "../constants/labels";
import PendingIcon from "@mui/icons-material/PendingActionsOutlined";
import ProgressIcon from "@mui/icons-material/MovingOutlined";
import CompletedIcon from "@mui/icons-material/CheckOutlined";
import OverdueIcon from "@mui/icons-material/RunningWithErrorsOutlined";
import ApprovedIcon from "@mui/icons-material/ThumbUpAltOutlined";

function Tasks() {
  const tasks = [
    {
      label: "Pending",
      count: 420,
      icon: <PendingIcon fontSize="large" />,
    },
    {
      label: "In Progress",
      count: 13,
      icon: <ProgressIcon fontSize="large" />,
    },
    {
      label: "Completed",
      count: 151,
      icon: <CompletedIcon fontSize="large" />,
    },
    {
      label: "Overdue",
      count: 13,
      icon: <OverdueIcon fontSize="large" />,
    },
    {
      label: "Approved",
      count: 19,
      icon: <ApprovedIcon fontSize="large" />,
    },
  ];
  return (
    <Box my={2}>
      <Typography my={1} fontSize={"15px"} fontWeight={600} color="#777777">
        {en.tasks}
      </Typography>

      <Grid
        container
        display="flex"
        alignItems="center"
        justifyContent="start"
        xs={12}
        gap={3}
      >
        {tasks.map(({ label, icon, count }) => {
          return (
            <Grid item xs={2}>
              <Box
                p={2}
                borderRadius={"10px"}
                sx={{ boxShadow: 3, cursor: "pointer" }}
              >
                <Grid
                  container
                  xs={12}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Grid item xs={4}>
                    {icon}
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1">{label}</Typography>
                    <Typography variant="body2">{count}</Typography>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}

interface TasksProps {}

export default Tasks;
