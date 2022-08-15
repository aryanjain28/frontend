import { Box, Divider, Grid, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { Button } from "../../../components/Button";
import { ROUTES } from "../../../constants/routes";
import { RegisterForm } from "../../../features/RegisterForm";
import PageLayout from "../../../layouts/PageLayout";
import { Key } from "@mui/icons-material";
import { en } from "../../../constants/labels";

function RegisterUser() {
  const router = useRouter();
  return (
    <PageLayout showLayout={false}>
      <Box display="flex" alignItems="center" justifyContent="center" my={10}>
        <Box sx={{ boxShadow: 3 }} borderRadius="15px" width="50%">
          <Grid
            container
            direction="row"
            alignItems="center"
            justifyContent="space-evenly"
            xs={12}
          >
            <Grid item xs={5}>
              <Typography variant="h4">Already have an account?</Typography>
              <Button
                label={en.login}
                icon={<Key />}
                onClick={() => router.push(ROUTES.login)}
                sx={{ my: 3 }}
                fullWidth
              />
            </Grid>
            <Divider orientation="vertical" flexItem />
            <Grid item xs={5}>
              <RegisterForm />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </PageLayout>
  );
}

export default RegisterUser;
