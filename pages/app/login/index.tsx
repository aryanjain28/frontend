import { Box, Grid } from "@mui/material";
import { LoginForm } from "../../../features/LoginForm";
import PageLayout from "../../../layouts/PageLayout";

function Login() {
  return (
    <PageLayout showLayout={false}>
      <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "90vh" }}
        xs={12}
      >
        <Grid item xs={4}>
          <LoginForm />
        </Grid>
      </Grid>
    </PageLayout>
  );
}

export default Login;
