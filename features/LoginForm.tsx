import { Key, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Grid,
  Icon,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { Button } from "../components/Button";
import { en } from "../constants/labels";
import { FormInput } from "./FormInput";
import { useLoginUser } from "../hooks/user.hooks";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import { ROUTES } from "../constants/routes";
import AccountIcon from "@mui/icons-material/AccountCircleOutlined";
import KeyIcon from "@mui/icons-material/KeyOutlined";
import PersonAddIcon from "@mui/icons-material/PersonAddOutlined";

export const LoginForm = () => {
  const [authDetails, setAuthDetails] = useState<{
    [key: string]: { label: string; value: string; error: string };
  }>({
    email: { label: en.email, value: "", error: "" },
    password: { label: en.password, value: "", error: "" },
  });
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const { mutate, isLoading } = useLoginUser();

  const handleLoginClick = () => {
    mutate({
      payload: {
        data: {
          email: authDetails.email.value,
          password: authDetails.password.value,
        },
      },
      callback: () => router.push(ROUTES.dashboard),
    });
  };

  const handleBlur = (key: string) => {
    let errorValue = "";
    const value = authDetails[key].value;
    if (!value) {
      errorValue = `${authDetails[key].label} is a required field.`;
    }
    setAuthDetails({
      ...authDetails,
      [key]: {
        ...authDetails[key],
        error: errorValue,
      },
    });
  };

  console.log("Inside Login form");

  return (
    <Grid
      container
      sx={{ boxShadow: 3 }}
      borderRadius="15px"
      direction="column"
      alignItems="center"
      justifyContent="end"
      py={4}
    >
      <FormInput
        label={authDetails.email.label}
        value={authDetails.email.value}
        handleOnChange={(value) =>
          setAuthDetails({
            ...authDetails,
            email: {
              ...authDetails.email,
              value: value as string,
            },
          })
        }
        handleOnBlur={() => handleBlur("email")}
        error={Boolean(authDetails.email.error)}
        helperText={authDetails.email.error}
        variant="outlined"
        endIcon={<AccountIcon />}
      />
      <FormInput
        type={showPassword ? "text" : "password"}
        label={authDetails.password.label}
        value={authDetails.password.value}
        handleOnChange={(value) =>
          setAuthDetails({
            ...authDetails,
            password: {
              ...authDetails.password,
              value: value as string,
            },
          })
        }
        handleOnBlur={() => handleBlur("password")}
        error={Boolean(authDetails.password.error)}
        helperText={authDetails.password.error}
        variant="outlined"
        handleEndIconClick={() => setShowPassword(!showPassword)}
        endIcon={showPassword ? <VisibilityOff /> : <Visibility />}
      />
      <Box display="flex" alignItems="center" justifyContent="center" gap={3}>
        <Button
          label={en.login}
          icon={<Key />}
          onClick={handleLoginClick}
          isLoading={isLoading}
          sx={{ my: 3 }}
        />
        <Button
          label={en.signUp}
          icon={<PersonAddIcon />}
          onClick={() => router.push(ROUTES.signUp)}
          sx={{ my: 3 }}
        />
      </Box>
    </Grid>
  );
};
