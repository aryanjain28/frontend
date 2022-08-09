import { Key, Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Grid } from "@mui/material";
import { useState } from "react";
import { Button } from "../components/Button";
import { en } from "../constants/labels";
import { FormInput } from "./FormInput";
import { usePostUser } from "../hooks/user.hooks";
import { useRouter } from "next/router";
import { ROUTES } from "../constants/routes";
import BadgeIcon from "@mui/icons-material/BadgeOutlined";
import EmailIcon from "@mui/icons-material/EmailOutlined";
import PersonAddIcon from "@mui/icons-material/PersonAddOutlined";

export const RegisterForm = () => {
  const [newUserDetails, setNewUserDetails] = useState<{
    [key: string]: { label: string; value: string; error: string };
  }>({
    fName: { label: en.fName, value: "", error: "" },
    lName: { label: en.lName, value: "", error: "" },
    email: { label: en.email, value: "", error: "" },
    password: { label: en.password, value: "", error: "" },
    cnfPassword: { label: en.cnfPassword, value: "", error: "" },
  });
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const { mutate, isLoading } = usePostUser();

  const handleSignUpClick = () => {
    let data: {
      fName: string;
      lName: string;
      email: string;
      password: string;
    } = {
      fName: newUserDetails["fName"].value,
      lName: newUserDetails["lName"].value,
      email: newUserDetails["email"].value,
      password: newUserDetails["password"].value,
    };
    mutate({
      payload: { data },
      callback: () => router.push(ROUTES.dashboard),
    });
  };

  const handleBlur = (key: string) => {
    let errorValue = "";
    const value = newUserDetails[key].value;
    if (!value) {
      errorValue = `${newUserDetails[key].label} is a required field.`;
    }
    setNewUserDetails({
      ...newUserDetails,
      [key]: {
        ...newUserDetails[key],
        error: errorValue,
      },
    });
  };

  const Icon: { [key: string]: any } = {
    fName: <BadgeIcon />,
    lName: <BadgeIcon />,
    email: <EmailIcon />,
    password: showPassword ? <VisibilityOff /> : <Visibility />,
    cnfPassword: showPassword ? <VisibilityOff /> : <Visibility />,
  };

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      py={4}
    >
      {Object.keys(newUserDetails).map((key) => {
        return (
          <FormInput
            type={
              key === "password" || key === "cnfPassword"
                ? showPassword
                  ? "text"
                  : "password"
                : "text"
            }
            label={newUserDetails[key].label}
            value={newUserDetails[key].value}
            handleOnChange={(value) =>
              setNewUserDetails({
                ...newUserDetails,
                [key]: {
                  ...newUserDetails[key],
                  value: value as string,
                },
              })
            }
            handleOnBlur={() => handleBlur(key)}
            error={Boolean(newUserDetails[key].error)}
            helperText={newUserDetails[key].error}
            variant="outlined"
            handleEndIconClick={() =>
              (key === "password" || key === "cnfPassword") &&
              setShowPassword(!showPassword)
            }
            endIcon={Icon[key as string]}
          />
        );
      })}
      <Button
        label={en.signUp}
        icon={<PersonAddIcon />}
        onClick={handleSignUpClick}
        isLoading={isLoading}
        sx={{ my: 3, width: "80%" }}
      />
    </Grid>
  );
};
