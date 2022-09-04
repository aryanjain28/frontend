import { Collapse, Divider, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { gradients, palette } from "../styles/theme";
import {
  Input as ClientInfoInput,
  SelectInput as ClientInfoSelect,
  DateSelect as ClientDateSelect,
} from "./CommClientInputs";
import { en } from "../constants/labels";
import { Button } from "../components/Button";
import {
  getClientFormFields,
  getClientFieldsInit,
} from "../utils/clients.utils";
import {
  ClientFormFieldType,
  ModifiedClientFields,
} from "../types/clients.types";
import { useRouter } from "next/router";
import { Select } from "../types/common.types";
import { useGetPincodes, useGetTaxpayerTypes } from "../hooks/clients.hooks";
import { useCallback, useEffect, useState } from "react";
import {
  KeyboardArrowDownOutlined,
  KeyboardArrowUpOutlined,
} from "@mui/icons-material";

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
    <Box py={0.5} width="20%" height="100%" px={0.5}>
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
  );
}

const FormRow = ({
  formFields,
  formValues,
  setFormValues,
}: {
  formFields: ClientFormFieldType[];
  formValues: ModifiedClientFields;
  setFormValues: (formValues: ModifiedClientFields) => void;
}) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="start"
      sx={{ flexWrap: "wrap" }}
      p={1}
    >
      {formFields.map(
        ({ name, fieldType, required, readOnly, isLoading, options }) => {
          const value = formValues[name as keyof typeof formValues] as string;
          return (
            <FormField
              key={`${Math.random}_${name}`}
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
    </Box>
  );
};

const ClientForm = (props: ClientFormProps) => {
  const {
    formValues,
    setFormValues,
    onSave,
    isSaving,
    isUpdate = false,
  } = props;
  const router = useRouter();
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

  const fields = getClientFormFields(options, {
    taxpayerTypesIsLoading,
    pincodesIsLoading,
  });

  const [clientFormFields, setClientFormFields] = useState(
    getClientFieldsInit(fields)
  );

  const toggleExpandedState = useCallback(
    (index: number, isExpanded: boolean) => {
      clientFormFields[index].isExpanded = !isExpanded;
      setClientFormFields([...clientFormFields]);
    },
    []
  );

  return (
    <Grid container direction="column" gap={4} p={2}>
      {clientFormFields.map(({ isExpanded, label, formFields }, index) => (
        <Box
          borderRadius={3}
          sx={{
            flexGrow: 1,
            border: `1px solid ${palette.secondary.light}`,
          }}
          p={2}
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography
              variant="h6"
              color={palette.primary.main}
              letterSpacing={1}
            >
              {label}
            </Typography>
            {isExpanded ? (
              <KeyboardArrowUpOutlined
                onClick={() => toggleExpandedState(index, isExpanded)}
                sx={{ fontSize: 20, mx: 3, cursor: "pointer" }}
              />
            ) : (
              <KeyboardArrowDownOutlined
                onClick={() => toggleExpandedState(index, isExpanded)}
                sx={{ fontSize: 20, mx: 3, cursor: "pointer" }}
              />
            )}
          </Box>
          <Collapse in={isExpanded}>
            <Divider />
            <FormRow
              formFields={formFields}
              formValues={formValues}
              setFormValues={setFormValues}
            />
          </Collapse>
        </Box>
      ))}
      <Box sx={{ flexGrow: 1 }} px={2}>
        <Typography variant="h6" color={palette.primary.main} letterSpacing={1}>
          {"5. Additional Info"}
        </Typography>
        <Divider />
      </Box>
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
          label={isUpdate ? "Update" : "Save"}
          color="success"
          onClick={onSave}
          variant="contained"
          isLoading={isSaving}
        />
      </Box>
    </Grid>
  );
};

interface ClientFormProps {
  formValues: ModifiedClientFields;
  setFormValues: (formValues: ModifiedClientFields) => void;
  onSave: () => void;
  isSaving: boolean;
  isUpdate?: boolean;
}

export default ClientForm;
