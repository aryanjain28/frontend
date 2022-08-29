import ITIcon from "@mui/icons-material/RequestPageOutlined";
import GSTIcon from "@mui/icons-material/DocumentScannerOutlined";
import CompanyIcon from "@mui/icons-material/ApartmentOutlined";
import TallyIcon from "@mui/icons-material/TextSnippetOutlined";
import AuditIcon from "@mui/icons-material/InventoryOutlined";
import OtherIcon from "@mui/icons-material/AltRouteOutlined";
import TickIcon from "@mui/icons-material/DoneOutlined";

import TotalFeesIcon from "@mui/icons-material/ArticleOutlined";
import TotalPaidIcon from "@mui/icons-material/GradingOutlined";
import BalanceIcon from "@mui/icons-material/NoteAddOutlined";

export const transactions = [
  {
    label: "Total Fees",
    icon: <TotalFeesIcon fontSize="large" />,
  },
  {
    label: "Total Paid",
    icon: <TotalPaidIcon fontSize="large" />,
  },
  {
    label: "Balance",
    icon: <BalanceIcon fontSize="large" />,
  },
];

export const clients: { label: string; icon: JSX.Element }[] = [
  {
    label: "GST",
    icon: <GSTIcon fontSize="large" />,
  },
  {
    label: "IT",
    icon: <ITIcon fontSize="large" />,
  },
  {
    label: "Tally",
    icon: <TallyIcon fontSize="large" />,
  },
  {
    label: "Reports",
    icon: <CompanyIcon fontSize="large" />,
  },
  {
    label: "Registrations",
    icon: <AuditIcon fontSize="large" />,
  },
  {
    label: "Other",
    icon: <OtherIcon fontSize="large" />,
  },
];
