import { Grid, Link, Typography } from "@mui/material";
import { Box } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { en } from "../constants/labels";
import { palette } from "../styles/theme";
import { getTasksArr } from "../utils/tasks.utils";

function Tasks({
  tasks: {
    PENDING = 0,
    COMPLETED = 0,
    INCOMPLETE = 0,
    APPROVED = 0,
    INPROGRESS = 0,
  },
}: {
  tasks: {
    PENDING: number;
    COMPLETED: number;
    INCOMPLETE: number;
    APPROVED: number;
    INPROGRESS: number;
  };
}) {
  const router = useRouter();
  const tasks = getTasksArr();

  const [tasksState, setTasksState] = useState([
    PENDING,
    INPROGRESS,
    COMPLETED,
    INCOMPLETE,
    APPROVED,
  ]);

  useEffect(() => {
    setTasksState([PENDING, INPROGRESS, COMPLETED, INCOMPLETE, APPROVED]);
  }, [PENDING, INPROGRESS, COMPLETED, INCOMPLETE, APPROVED]);

  return (
    <Box my={2}>
      <Typography
        my={1}
        fontSize={"15px"}
        fontWeight={600}
        color={palette.neutral.main}
      >
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
        {tasks.map(({ label, icon, route }, index) => {
          const count = index === 0 ? 40 : tasksState[index];
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
