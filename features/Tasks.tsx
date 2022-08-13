import { Grid, Link, Typography } from "@mui/material";
import { Box } from "@mui/material";
import { useRouter } from "next/router";
import { en } from "../constants/labels";
import { getTasksArr } from "../utils/tasks.utils";

function Tasks() {
  const router = useRouter();
  const tasks = getTasksArr();

  return (
    <Box my={2}>
      <Typography my={1} fontSize={"15px"} fontWeight={600} color="#777777">
        {en.tasks}
      </Typography>
      <Grid
        container
        display="flex"
        alignItems="center"
        justifyContent="space-evenly"
        xs={12}
        gap={3}
      >
        {tasks.map(({ label, icon, count, route }, index) => {
          return (
            <Grid key={`${label}_${index}`} item xs={1.8}>
              <Box
                p={2}
                borderRadius={"10px"}
                sx={{ boxShadow: 3, cursor: "pointer" }}
                onClick={() => router.push(route as string)}
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
                    <Typography variant="body1" noWrap>
                      {label}
                    </Typography>
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
