import { Collapse, Divider, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { palette } from "../styles/theme";
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
import {
  useGetBankDetails,
  useGetPincodeDetails,
} from "../hooks/clients.hooks";
import { useCallback, useEffect, useState } from "react";
import {
  KeyboardArrowDownOutlined,
  KeyboardArrowUpOutlined,
} from "@mui/icons-material";
import { IFSC_LENGTH, PINCODE_LENGTH } from "../constants/clients.constants";
import { AdditionalInfo, FormRow } from "./ClientFormField";

const ClientForm = (props: ClientFormProps) => {
  const {
    formValues,
    setFormValues,
    onSave,
    isSaving,
    isUpdate = false,
  } = props;
  const router = useRouter();

  const { data: location, isFetching: isFetchingLocation } =
    useGetPincodeDetails(formValues.pincode || "");

  const { data: bankDetails, isFetching: isFetchingBankDetails } =
    useGetBankDetails(formValues.bankIFSC || "");

  useEffect(() => {
    if (!formValues.pincode) {
      setFormValues({ ...formValues, state: "", district: "", city: "" });
    } else if (
      location &&
      formValues.pincode &&
      formValues.pincode.length === PINCODE_LENGTH
    ) {
      const { pincode = "", state = "", city = "", district = "" } = location;
      setFormValues({ ...formValues, pincode, state, district, city });
    } else if (!location) {
      setFormValues({ ...formValues, state: "", district: "", city: "" });
    }
  }, [location, formValues.pincode]);

  useEffect(() => {
    if (
      bankDetails &&
      formValues.bankIFSC &&
      formValues.bankIFSC.length === IFSC_LENGTH
    ) {
      setFormValues({ ...formValues, ...bankDetails });
    }
  }, [bankDetails, formValues.bankIFSC]);

  const fields = getClientFormFields({
    pincodesIsLoading: false,
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
      {clientFormFields.map(
        ({ isExpanded, label, formFields, isAdditional = false }, index) => (
          <Box
            borderRadius={3}
            sx={{
              flexGrow: 1,
              border: `1px solid ${palette.secondary.light}`,
              ...(!isExpanded && {
                color: "white",
                background: palette.primary.main,
              }),
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
                color={
                  !isExpanded ? palette.primary.white : palette.primary.main
                }
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
              {!isAdditional ? (
                <FormRow
                  formFields={formFields as ClientFormFieldType[]}
                  formValues={formValues}
                  setFormValues={setFormValues}
                />
              ) : (
                <AdditionalInfo
                  formValues={formValues}
                  setFormValues={setFormValues}
                />
              )}
            </Collapse>
          </Box>
        )
      )}

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
