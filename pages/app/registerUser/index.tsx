import { Grid } from "@mui/material";
import { RegisterForm } from "../../../features/RegisterForm";
import PageLayout from "../../../layouts/PageLayout";

function RegisterUser() {
  return (
    <PageLayout showLayout={false}>
      <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent="space-evenly"
        style={{ minHeight: "90vh" }}
        xs={12}
      >
        <Grid item xs={5}>
          <img src={"image"} />
        </Grid>
        <Grid item xs={5}>
          <RegisterForm />
        </Grid>
      </Grid>
    </PageLayout>
  );
}

export default RegisterUser;
