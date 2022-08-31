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
import { getClientFormFields, getArrInGroups } from "../utils/clients.utils";
import {
  ClientFormFieldType,
  ModifiedClientFields,
} from "../types/clients.types";
import { useRouter } from "next/router";
import { Select } from "../types/common.types";
import { useGetPincodes, useGetTaxpayerTypes } from "../hooks/clients.hooks";
import { useEffect } from "react";

function FormField({
  name,
  value,
  required = false,
  fieldType = "text",
  setFormValues,
  options = [],
  readOnly = false,
  isLoading = false,
}: {
  name: string;
  value: string;
  required?: boolean;
  fieldType?: string;
  setFormValues: (name: string, value: string | Date, label?: string) => void;
  options?: Select[] | string[];
  readOnly?: boolean;
  isLoading?: boolean;
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
            readOnly={readOnly}
            isLoading={isLoading}
          />
        )}
        {fieldType === "select" && (
          <ClientInfoSelect
            label={en[name as keyof typeof en] as string}
            value={value}
            handleChange={(value, label) =>
              setFormValues(name, value as string, label as string)
            }
            options={options}
            required={required}
            readOnly={readOnly}
            isLoading={isLoading}
          />
        )}
        {fieldType === "date" && (
          <ClientDateSelect
            label={en[name as keyof typeof en] as string}
            value={value}
            handleChange={(value) => setFormValues(name, value)}
            required={required}
            showCancleIcon
            readOnly={readOnly}
            isLoading={isLoading}
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
  <Grid container spacing={2}>
    {allFormFields.map((formFields: ClientFormFieldType[]) => {
      return (
        <Grid container item spacing={2}>
          {formFields.map(
            ({ name, fieldType, required, readOnly, isLoading, options }) => {
              const value = formValues[
                name as keyof typeof formValues
              ] as string;
              return (
                <FormField
                  name={name}
                  fieldType={fieldType}
                  required={required}
                  value={value}
                  setFormValues={(name: string, value: string | Date) =>
                    setFormValues({ ...formValues, [name]: value })
                  }
                  options={options}
                  readOnly={readOnly}
                  isLoading={isLoading}
                />
              );
            }
          )}
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
  const dividedFormFields = getArrInGroups(formFields);
  return (
    <Box sx={{ flexGrow: 1 }} py={1} px={2} m={1}>
      <Typography variant="h6" color={palette.primary.main} letterSpacing={1}>
        {`1. ${en.client}`}
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
  const dividedFormFields = getArrInGroups(formFields);
  return (
    <Box sx={{ flexGrow: 1 }} py={1} px={2} m={1}>
      <Typography variant="h6" color={palette.primary.main} letterSpacing={1}>
        {`2. ${en.contactDetails}`}
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
  const dividedFormFields = getArrInGroups(formFields);
  return (
    <Box sx={{ flexGrow: 1 }} py={1} px={2} m={1}>
      <Typography variant="h6" color={palette.primary.main} letterSpacing={1}>
        {`3. ${en.gstCreds}`}
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
  const { formValues, setFormValues, onSave, isSaving } = props;
  const { data: taxpayerTypes, isFetching: taxpayerTypesIsLoading } =
    useGetTaxpayerTypes();
  const { data: pincodes, isFetching: pincodesIsLoading } = useGetPincodes();

  useEffect(() => {
    if (!formValues.pincode) {
      setFormValues({ ...formValues, state: "", district: "", city: "" });
    } else if (pincodes && formValues.pincode) {
      const { state, name: city, district } = pincodes[formValues.pincode];
      setFormValues({ ...formValues, state, district, city });
    }
  }, [formValues.pincode]);

  const options = {
    taxpayerTypesOptions: (taxpayerTypes || []).map((p) => ({
      value: p.id,
      label: p.name,
    })),
    pincodesOptions: Object.values(pincodes || {}).map((p) => ({
      value: p.id,
      label: `${p.pincode}`,
    })),
  };

  const { businessInfo, contactDetails, gstFields } = getClientFormFields(
    options,
    { taxpayerTypesIsLoading, pincodesIsLoading }
  );
  const router = useRouter();

  return (
    <Box px={2} borderRadius={2}>
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
          isLoading={isSaving}
        />
      </Box>
    </Box>
  );
};

interface NewClientFormProps {
  formValues: ModifiedClientFields;
  setFormValues: (formValues: ModifiedClientFields) => void;
  onSave: () => void;
  isSaving: boolean;
}

export default NewClientForm;
