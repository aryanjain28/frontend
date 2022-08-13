import { KeyboardArrowLeft } from "@mui/icons-material";
import { Tooltip, Typography } from "@mui/material";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { Box } from "@mui/system";
import NextLink from "next/link";
import { useRouter } from "next/router";

function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

export const BreadCrumbsComp = (props: BreadCrumbsCompProps) => {
  const router = useRouter();
  const { breadCrumbs } = props;
  return (
    <Box
      display="flex"
      alignItems="center"
      sx={{ mt: 2, mb: 0, mx: 3 }}
      onClick={handleClick}
    >
      {breadCrumbs.length > 1 && (
        <Tooltip title="Go Back" arrow placement="top">
          <KeyboardArrowLeft
            color="inherit"
            sx={{
              fontSize: "16px",
              mb: "2px",
              cursor: "pointer",
            }}
            onClick={() => router.back()}
          />
        </Tooltip>
      )}
      <Breadcrumbs>
        {breadCrumbs.map(({ label, url }, index) => (
          <NextLink key={`${label}_${index}`} href={url}>
            <Link underline="hover" color="inherit" sx={{ cursor: "pointer" }}>
              <Typography fontSize="11px">{label}</Typography>
            </Link>
          </NextLink>
        ))}
      </Breadcrumbs>
    </Box>
  );
};

interface BreadCrumbsCompProps {
  breadCrumbs: { label: string; url: string }[];
}
