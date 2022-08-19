import { Divider, Grid, Paper, styled, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { palette } from "../styles/theme";
import {
  Input as ClientInfoInput,
  SelectInput as ClientInfoSelect,
  DateSelect as ClientDateSelect,
} from "./CommClientInputs";
import { en } from "../constants/labels";
import { Button } from "../components/Button";
import { useState } from "react";

function FormRow({ formValues }: { formValues?: any }) {
  return formValues.map((formValue: any) => {
    const {
      name,
      label,
      value,
      handleChange,
      required,
      fieldType = "text",
    } = formValue;
    return (
      <Grid item xs={3}>
        <Box py={1} height="100%">
          {(fieldType === "text" || fieldType === "password") && (
            <ClientInfoInput
              label={label}
              value={value}
              handleChange={(value) => handleChange(name, value)}
              required={required}
              type={fieldType}
            />
          )}
          {fieldType === "select" && (
            <ClientInfoSelect
              label={label}
              value={value}
              handleChange={(value, label) => handleChange(name, value, label)}
              options={["Aryan"]}
              required={required}
            />
          )}
          {fieldType === "date" && (
            <ClientDateSelect
              label={label}
              value={value}
              handleChange={(value) => handleChange(name, value)}
              required={required}
            />
          )}
        </Box>
      </Grid>
    );
  });
}

const ClientBusinessInfo = ({ formFields }: { formFields: any }) => {
  return (
    <Box sx={{ flexGrow: 1 }} py={1} px={2} m={1}>
      <Typography variant="h6" color={palette.primary.main} letterSpacing={1}>
        1. Client
      </Typography>
      <Divider />
      <Grid container spacing={1}>
        {formFields.map((formField: any) => (
          <Grid container item spacing={3}>
            <FormRow formValues={formField} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

const ContactDetails = ({ formFields }: { formFields: any }) => {
  return (
    <Box sx={{ flexGrow: 1 }} py={1} px={2} m={1}>
      <Typography variant="h6" color={palette.primary.main} letterSpacing={1}>
        2. Contact Details
      </Typography>
      <Divider />
      <Grid container spacing={1}>
        {formFields.map((formField: any) => (
          <Grid container item spacing={3}>
            <FormRow formValues={formField} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

const GstDetails = ({ formFields }: { formFields: any }) => {
  return (
    <Box sx={{ flexGrow: 1 }} py={1} px={2} m={1}>
      <Typography variant="h6" color={palette.primary.main} letterSpacing={1}>
        3. GST Website Credentials
      </Typography>
      <Grid container spacing={1}>
        <Grid container item spacing={3}>
          <FormRow formValues={formFields} />
        </Grid>
      </Grid>
    </Box>
  );
};

const NewClientForm = () => {
  const [formValues, setFormValues] = useState<any>({
    gstIn: "123463456578",
    registrationDate: "",
    taxpayerType: "",
  });

  const clientBusinessInfoFields = [
    [
      {
        name: "gstIn",
        label: en.gstIn,
        handleChange: (key: string, value: string) =>
          setFormValues({ ...formValues, [key]: value }),
        value: formValues.gstIn,
      },
      {
        name: "registrationDate",
        label: en.regisDate,
        handleChange: (key: string, value: string) =>
          setFormValues({ ...formValues, [key]: value }),
        value: formValues.registrationDate,
        fieldType: "date",
      },
      {
        name: "taxpayerType",
        label: en.taxpayerType,
        handleChange: (key: string, value: string) =>
          setFormValues({ ...formValues, [key]: value }),
        value: formValues.taxpayerType,
        fieldType: "select",
      },
      {
        name: "legalName",
        label: en.legalName,
        handleChange: (key: string, value: string) =>
          setFormValues({ ...formValues, [key]: value }),
        value: formValues.legalName,
      },
    ],
    [
      {
        name: "businessName",
        label: en.businessName,
        handleChange: (key: string, value: string) =>
          setFormValues({ ...formValues, [key]: value }),
        value: formValues.businessName,
      },
      {
        name: "businessConstitution",
        label: en.businessConstitution,
        handleChange: (key: string, value: string) =>
          setFormValues({ ...formValues, [key]: value }),
        value: formValues.businessConstitution,
        fieldType: "select",
      },
      {
        name: "businessActivity",
        label: en.businessActivity,
        handleChange: (key: string, value: string) =>
          setFormValues({ ...formValues, [key]: value }),
        value: formValues.businessActivity,
      },
      {
        name: "panNumber",
        label: en.panNumber,
        handleChange: (key: string, value: string) =>
          setFormValues({ ...formValues, [key]: value }),
        value: formValues.panNumber,
      },
    ],
  ];
  const contactDetails = [
    [
      {
        name: "address",
        label: en.address,
        handleChange: (key: string, value: string) =>
          setFormValues({ ...formValues, [key]: value }),
        value: formValues.address,
      },
      {
        name: "city",
        label: en.city,
        handleChange: (key: string, value: string) =>
          setFormValues({ ...formValues, [key]: value }),
        value: formValues.city,
      },
      {
        name: "district",
        label: en.district,
        handleChange: (key: string, value: string) =>
          setFormValues({ ...formValues, [key]: value }),
        value: formValues.district,
      },
      {
        name: "state",
        label: en.state,
        handleChange: (key: string, value: string) =>
          setFormValues({ ...formValues, [key]: value }),
        value: formValues.state,
        fieldType: "select",
      },
    ],
    [
      {
        name: "pinCode",
        label: en.pinCode,
        handleChange: (key: string, value: string) =>
          setFormValues({ ...formValues, [key]: value }),
        value: formValues.pinCode,
      },
      {
        name: "primaryMob",
        label: en.primaryMob,
        handleChange: (key: string, value: string) =>
          setFormValues({ ...formValues, [key]: value }),
        value: formValues.primaryMob,
      },
      {
        name: "secondaryMob",
        label: en.secondaryMob,
        handleChange: (key: string, value: string) =>
          setFormValues({ ...formValues, [key]: value }),
        value: formValues.secondaryMob,
      },
      {
        name: "primaryEmail",
        label: en.primaryEmail,
        handleChange: (key: string, value: string) =>
          setFormValues({ ...formValues, [key]: value }),
        value: formValues.primaryEmail,
      },
    ],
  ];
  const gstFields = [
    {
      name: "username",
      label: en.username,
      handleChange: (key: string, value: string) =>
        setFormValues({ ...formValues, [key]: value }),
      value: formValues.userName,
    },
    {
      name: "password",
      label: en.password,
      handleChange: (key: string, value: string) =>
        setFormValues({ ...formValues, [key]: value }),
      value: formValues.password,
      fieldType: "password",
    },
  ];
  return (
    <Box m={3} borderRadius={2} border="1px green solid">
      <ClientBusinessInfo formFields={clientBusinessInfoFields} />
      <ContactDetails formFields={contactDetails} />
      <GstDetails formFields={gstFields} />
      <Box
        display="flex"
        alignItems="center"
        justifyContent="end"
        mb={2}
        mx={3}
        gap={2}
      >
        <Button label="Go Back" onClick={() => {}} />
        <Button
          label="Save"
          color="success"
          onClick={() => {}}
          variant="contained"
        />
      </Box>
    </Box>
  );
};

export default NewClientForm;
