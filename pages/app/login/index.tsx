import { Box, Divider, Grid, Typography } from "@mui/material";
import { en } from "../../../constants/labels";
import { LoginForm } from "../../../features/LoginForm";
import PageLayout from "../../../layouts/PageLayout";
import PersonAddIcon from "@mui/icons-material/PersonAddOutlined";
import { Button } from "../../../components/Button";
import { useRouter } from "next/router";
import { ROUTES } from "../../../constants/routes";

function Login() {
  const router = useRouter();
  return (
    <PageLayout showLayout={false}>
      <Box display="flex" alignItems="center" justifyContent="center" my={15}>
        <Box sx={{ boxShadow: 3 }} borderRadius="15px" width="50%">
          <Grid
            container
            direction="row"
            alignItems="center"
            justifyContent="space-evenly"
            xs={12}
          >
            <Grid item xs={4}>
              <LoginForm />
            </Grid>
            <Divider orientation="vertical" flexItem />
            <Grid
              container
              xs={4}
              direction="column"
              alignItems="center"
              justifyContent="center"
            >
              <Typography variant="h5">{`${en.newHere}`}</Typography>
              <Button
                label={en.signUp}
                icon={<PersonAddIcon />}
                onClick={() => router.push(ROUTES.signUp)}
                sx={{ my: 3 }}
                fullWidth
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </PageLayout>
  );
}

export default Login;
