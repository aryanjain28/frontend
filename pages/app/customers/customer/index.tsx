import { Box, Divider, Grid, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { Button } from "../../../../components/Button";
import { BreadCrumbsComp } from "../../../../features/BreadCrumbs";
import { FormInput } from "../../../../features/FormInput";
import { usePostCustomer } from "../../../../hooks/customers.hooks";
import PageLayout from "../../../../layouts/PageLayout";
import { Customer } from "../../../../types/customers.types";

const CustomerDetails = () => {
  const [customerData, setCustomerData] = useState<Customer>({
    name: "",
    email: "",
    mobile: undefined,
    address: "",
    id: "",
  });

  const { mutate: saveCustomer, isLoading } = usePostCustomer();

  const handleSave = useCallback(() => {
    // if (!customerData.name) {
    //   saveCustomer({ payload: { data: customerData } });
    // } else {
    //   toast.error("Name is a required field.");
    // }
    saveCustomer({ payload: { data: customerData } });
  }, [customerData, setCustomerData]);

  return (
    <PageLayout>
      <Box
        sx={{
          mx: 4,
          my: 2,
          border: "#dadada 1.5px solid",
          borderRadius: "5px",
        }}
      >
        <BreadCrumbsComp
          breadCrumbs={[
            { label: "Customers", url: "/app/customers" },
            { label: "Add New Customer", url: "" },
          ]}
        />
        <Typography mx={3} color="#0B1246" variant="h6">
          Customer Details
        </Typography>
        <Divider sx={{ my: 0 }} />

        <Grid
          container
          display="flex"
          alignItems="start"
          justifyContent="space-around"
        >
          <Grid item>
            <FormInput
              label="Name"
              value={customerData.name}
              handleOnChange={(value) =>
                setCustomerData({ ...customerData, name: value as string })
              }
            />
          </Grid>
          <Grid item>
            <FormInput
              label="Email"
              value={customerData.email as string}
              handleOnChange={(value) =>
                setCustomerData({ ...customerData, email: value as string })
              }
            />
          </Grid>
          <Grid item>
            <FormInput
              label="Mobile"
              type="number"
              value={customerData.mobile as number}
              handleOnChange={(value) =>
                setCustomerData({
                  ...customerData,
                  mobile: value as number,
                })
              }
            />
          </Grid>
          <Grid item>
            <FormInput
              label="Address"
              value={customerData.address as string}
              handleOnChange={(value) =>
                setCustomerData({
                  ...customerData,
                  address: value as string,
                })
              }
              sx={{ width: "100%" }}
              rows={2}
            />
          </Grid>
        </Grid>
        <Grid container display="flex" justifyContent="start">
          <Grid item>
            <Button
              sx={{ mb: 2, mt: 1, mx: 4, px: 10, width: "50%" }}
              onClick={handleSave}
              label="Save"
              color="success"
              variant="contained"
            />
          </Grid>
        </Grid>
      </Box>
    </PageLayout>
  );
};

export default CustomerDetails;
