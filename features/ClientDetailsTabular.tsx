import { Box } from "@mui/material";
import { palette } from "../styles/theme";
import { ModifiedClientFields } from "../types/clients.types";
import { capitalize, formatTime, formatTime2 } from "../utils/common.utils";
import { ViewTable } from "./ViewTable";

export const ClientDetailsViewOnly = ({
  data,
}: {
  data: ModifiedClientFields;
}) => {
  const modData = { ...data };
  delete modData._id;
  delete modData.createdBy;
  delete modData.id;
  delete modData.createdAt;
  delete modData.updatedAt;
  delete modData.additionalInfo;

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      width="100%"
      sx={{ background: palette.primary.light }}
      py={2}
    >
      <Box width="60%" py={2}>
        <ViewTable
          data={Object.entries(modData).map(([key, value]) => {
            let fieldValue = value;
            if (["dob", "registrationDate"].includes(key)) {
              fieldValue = formatTime2(value as string) || "";
            }
            return { "Field Name": capitalize(key), "Field Value": fieldValue };
          })}
          columns={["Field Name", "Field Value"]}
          isLoading={false}
          colSpan={5}
          height={100}
        />
      </Box>
    </Box>
  );
};
