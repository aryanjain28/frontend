import { Customer } from "../types/customers.types";
import { ColumnG } from "../types/datagrid.types";
import { Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/AccountCircleSharp";
import Link from "next/link";
import { Box } from "@mui/system";

export const getCustomerCol = (): ColumnG<Customer>[] => [
  {
    headerName: "Name",
    key: "name",
    Component: ({ row }) => {
      return (
        <Box display="flex" alignItems="start" gap={2}>
          <PersonIcon
            sx={{
              display: "flex",
              alignItems: "center",
              fontSize: "13px",
            }}
          />
          <Link href={`/app/customers/customer/${row.id}`}>
            <Typography
              sx={{
                color: "#0B1246",
                cursor: "pointer",
                textDecoration: "underline",
              }}
              fontSize="13px"
            >
              {row.name}
            </Typography>
          </Link>
        </Box>
      );
    },
  },
  {
    headerName: "Email",
    key: "email",
  },
  {
    headerName: "Mobile",
    key: "mobile",
  },
  {
    headerName: "Address",
    key: "address",
  },
  // {
  //   headerName: "Actions",
  //   key: "icons",
  //   Component: ({ row }) => {
  //     return (
  //       <Box display="flex" alignItems="center" gap={2}>
  //         <Tooltip arrow placement="top" title="Edit Customer Details">
  //           <EditIcon sx={{ cursor: "pointer", fontSize: "14px" }} />
  //         </Tooltip>

  //         <Tooltip arrow placement="top" title="Delete Customer Details">
  //           <Delete sx={{ cursor: "pointer", fontSize: "14px" }} />
  //         </Tooltip>
  //       </Box>
  //     );
  //   },
  // },
];
