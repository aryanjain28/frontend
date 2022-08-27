import { Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { en } from "../../../../constants/labels";
import { ROUTES } from "../../../../constants/routes";
import { BreadCrumbsComp } from "../../../../features/BreadCrumbs";
import { SendMessageForm } from "../../../../features/SendMessageForm";
import PageLayout from "../../../../layouts/PageLayout";
import { palette } from "../../../../styles/theme";

const SendMessage = () => {
  return (
    <PageLayout>
      <Box
        sx={{
          border: `${palette.secondary.light} 1.5px solid`,
          borderRadius: "5px",
        }}
      >
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box mb={1}>
            <BreadCrumbsComp
              breadCrumbs={[
                { label: en.dashboard as string, url: ROUTES.dashboard },
                { label: en.sendMessage as string, url: ROUTES.messagesSend },
              ]}
            />
            <Typography
              mx={3}
              color={palette.primary.main}
              variant="h6"
              letterSpacing={1}
            >
              {en.sendMessage}
            </Typography>
          </Box>
        </Box>
        <Divider sx={{ my: 0 }} />
        <SendMessageForm />
      </Box>
    </PageLayout>
  );
};

export default SendMessage;
