import { Box, Divider, Grid, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { Button } from "../../../../../components/Button";
import { BreadCrumbsComp } from "../../../../../features/BreadCrumbs";
import { FormInput } from "../../../../../features/FormInput";
import {
  useDeleteCustomer,
  useGetCustomerDetails,
  usePatchCustomer,
  usePostCustomer,
} from "../../../../../hooks/customers.hooks";
import PageLayout from "../../../../../layouts/PageLayout";
import { Customer } from "../../../../../types/customers.types";

const CustomerDetails = () => {
  const router = useRouter();
  const { customerId } = router.query;
  const [customerData, setCustomerData] = useState<Customer>({
    name: "",
    email: "",
    address: "",
    id: "",
  });
  const { data } = useGetCustomerDetails(customerId as string);

  const { mutate: updateCustomerDetails, isLoading: isUpdating } =
    usePatchCustomer();
  const { mutate: deleteCustomerDetails, isLoading: isDeleting } =
    useDeleteCustomer();

  useEffect(() => {
    if (data) {
      setCustomerData(data);
    }
  }, [data]);

  const handleUpdate = useCallback(() => {
    updateCustomerDetails({
      customerId: `${customerId}`,
      payload: { data: customerData },
    });
  }, [customerId, customerData, setCustomerData]);

  const handleDelete = useCallback(() => {
    deleteCustomerDetails({
      customerId: `${customerId}`,
    });
  }, [customerId]);

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
            { label: data?.name || "Customers Details", url: "" },
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
        <Grid
          display="flex"
          justifyContent="start"
          gap={2}
          sx={{ mx: 4, mb: 2 }}
        >
          <Grid item>
            <Button
              sx={{ px: 5 }}
              onClick={handleUpdate}
              label="Update"
              isLoading={isUpdating}
            />
          </Grid>
          <Grid item>
            <Button
              sx={{ px: 5 }}
              label="Delete"
              onClick={handleDelete}
              color="error"
            />
          </Grid>
        </Grid>
      </Box>
    </PageLayout>
  );
};

export default CustomerDetails;
