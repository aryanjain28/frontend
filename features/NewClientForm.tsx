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
import { clientFormFields, getArrInGroups } from "../utils/clients.utils";
import {
  ClientFormFieldType,
  ModifiedClientFields,
} from "../types/clients.types";
import { useRouter } from "next/router";

function FormField({
  name,
  value,
  required = false,
  fieldType = "text",
  setFormValues,
}: {
  name: string;
  value: string;
  required?: boolean;
  fieldType?: string;
  setFormValues: (name: string, value: string | Date, label?: string) => void;
}) {
  return (
    <Grid item xs={3}>
      <Box py={1} height="100%">
        {(fieldType === "text" || fieldType === "password") && (
          <ClientInfoInput
            label={en[name as keyof typeof en] as string}
            value={value}
            handleChange={(value) => setFormValues(name, value)}
            required={required}
            type={fieldType}
          />
        )}
        {fieldType === "select" && (
          <ClientInfoSelect
            label={en[name as keyof typeof en] as string}
            value={value}
            handleChange={(value, label) => setFormValues(name, value, label)}
            options={"WERT YUIO PSD FGH JKLX CVBNMR YU QWERE W ERTYRT TYFGH BCVSDFW QE".split(
              " "
            )}
            required={required}
          />
        )}
        {fieldType === "date" && (
          <ClientDateSelect
            label={en[name as keyof typeof en] as string}
            value={value}
            handleChange={(value) => setFormValues(name, value)}
            required={required}
          />
        )}
      </Box>
    </Grid>
  );
}

const FormRow = ({
  allFormFields,
  formValues,
  setFormValues,
}: {
  allFormFields: ClientFormFieldType[][];
  formValues: ModifiedClientFields;
  setFormValues: (formValues: ModifiedClientFields) => void;
}) => (
  <Grid container spacing={1}>
    {allFormFields.map((formFields: ClientFormFieldType[]) => {
      return (
        <Grid container item spacing={3}>
          {formFields.map(({ name, fieldType, required }) => (
            <FormField
              name={name}
              fieldType={fieldType}
              required={required}
              value={formValues[name as keyof typeof formValues] as string}
              setFormValues={(name: string, value: string | Date) =>
                setFormValues({ ...formValues, [name]: value })
              }
            />
          ))}
        </Grid>
      );
    })}
  </Grid>
);

const ClientBusinessInfo = ({
  formValues,
  formFields,
  setFormValues,
}: {
  formValues: ModifiedClientFields;
  formFields: ClientFormFieldType[];
  setFormValues: (formValues: ModifiedClientFields) => void;
}) => {
  const dividedFormFields = getArrInGroups(formFields, 2);
  return (
    <Box sx={{ flexGrow: 1 }} py={1} px={2} m={1}>
      <Typography variant="h6" color={palette.primary.main} letterSpacing={1}>
        1. Client
      </Typography>
      <Divider />
      <FormRow
        allFormFields={dividedFormFields}
        formValues={formValues}
        setFormValues={setFormValues}
      />
    </Box>
  );
};

const ContactDetails = ({
  formValues,
  formFields,
  setFormValues,
}: {
  formValues: ModifiedClientFields;
  formFields: ClientFormFieldType[];
  setFormValues: (formValues: ModifiedClientFields) => void;
}) => {
  const dividedFormFields = getArrInGroups(formFields, 2);
  return (
    <Box sx={{ flexGrow: 1 }} py={1} px={2} m={1}>
      <Typography variant="h6" color={palette.primary.main} letterSpacing={1}>
        2. Contact Details
      </Typography>
      <Divider />
      <FormRow
        allFormFields={dividedFormFields}
        formValues={formValues}
        setFormValues={setFormValues}
      />
    </Box>
  );
};

const GstDetails = ({
  formValues,
  formFields,
  setFormValues,
}: {
  formValues: ModifiedClientFields;
  formFields: ClientFormFieldType[];
  setFormValues: (formValues: ModifiedClientFields) => void;
}) => {
  const dividedFormFields = getArrInGroups(formFields, 1);
  return (
    <Box sx={{ flexGrow: 1 }} py={1} px={2} m={1}>
      <Typography variant="h6" color={palette.primary.main} letterSpacing={1}>
        3. GST Website Credentials
      </Typography>
      <FormRow
        allFormFields={dividedFormFields}
        formValues={formValues}
        setFormValues={setFormValues}
      />
    </Box>
  );
};

const NewClientForm = (props: NewClientFormProps) => {
  const { formValues, setFormValues, onSave } = props;
  const { businessInfo, contactDetails, gstFields } = clientFormFields;
  const router = useRouter();

  return (
    <Box m={3} borderRadius={2} border={`1px ${palette.secondary.light} solid`}>
      <ClientBusinessInfo
        formValues={formValues}
        formFields={businessInfo}
        setFormValues={setFormValues}
      />
      <ContactDetails
        formValues={formValues}
        formFields={contactDetails}
        setFormValues={setFormValues}
      />
      <GstDetails
        formValues={formValues}
        formFields={gstFields}
        setFormValues={setFormValues}
      />
      <Box
        display="flex"
        alignItems="center"
        justifyContent="end"
        mb={2}
        mx={3}
        gap={2}
      >
        <Button label="Go Back" onClick={() => router.back()} />
        <Button
          label="Save"
          color="success"
          onClick={onSave}
          variant="contained"
        />
      </Box>
    </Box>
  );
};

interface NewClientFormProps {
  formValues: ModifiedClientFields;
  setFormValues: (formValues: ModifiedClientFields) => void;
  onSave: () => void;
}

export default NewClientForm;
