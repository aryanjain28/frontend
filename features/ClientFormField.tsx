import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import {
  Input as ClientInfoInput,
  SelectInput as ClientInfoSelect,
  DateSelect as ClientDateSelect,
} from "./CommClientInputs";
import { en } from "../constants/labels";
import { Button } from "../components/Button";
import {
  ClientFormFieldType,
  ModifiedClientFields,
} from "../types/clients.types";
import { Select } from "../types/common.types";
import { Add, CancelOutlined } from "@mui/icons-material";
import {
  MAX_ADDITIONAL_FIELDS,
  MIN_ADDITIONAL_FIELDS,
} from "../constants/clients.constants";

export const FormField = ({
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
}) => {
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
};

export const FormRow = ({
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

export const AdditionalInfo = ({
  formValues,
  setFormValues,
}: {
  formValues: ModifiedClientFields;
  setFormValues: (formValues: ModifiedClientFields) => void;
}) => {
  const additionalInfo = formValues.additionalInfo as {
    key: string;
    value: string;
  }[];

  const handleAddField = () => {
    additionalInfo.push({ key: "", value: "" });
    setFormValues({ ...formValues });
  };

  const handleRemoveField = (index: number) => {
    setFormValues({
      ...formValues,
      additionalInfo: additionalInfo.filter((_, i) => i !== index),
    });
  };

  const handleInputChange = (
    type: "key" | "value",
    value: string,
    index: number
  ) => {
    additionalInfo[index][type] = value;
    setFormValues({ ...formValues });
  };

  return (
    <Grid container direction="column" gap={2} py={1} px={2}>
      {(formValues.additionalInfo as any)?.map(
        ({ key, value }: { key: string; value: string }, index: number) => (
          <Box
            key={"BOX_ADDN_INFO" + index}
            display="flex"
            alignItems="start"
            justifyContent="start"
            width="100%"
            gap={1}
          >
            <ClientInfoInput
              key={"KEY_FIELD" + index}
              value={key}
              handleChange={(v) => handleInputChange("key", v, index)}
              label={`Key`}
            />
            <ClientInfoInput
              key={"VAL_FIELD" + index}
              value={value}
              handleChange={(v) => handleInputChange("value", v, index)}
              label={`Value`}
            />
            {additionalInfo?.length > MIN_ADDITIONAL_FIELDS && (
              <CancelOutlined
                onClick={() => handleRemoveField(index)}
                sx={{ fontSize: 15, cursor: "pointer" }}
              />
            )}
          </Box>
        )
      )}
      {additionalInfo?.length < MAX_ADDITIONAL_FIELDS && (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="start"
          width="100%"
        >
          <Button
            icon={<Add />}
            variant="text"
            label="Add Field"
            onClick={handleAddField}
          />
        </Box>
      )}
    </Grid>
  );
};
