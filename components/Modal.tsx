import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Grid } from "@mui/material";
import { DeleteOutlined } from "@mui/icons-material";
import { Button } from "./Button";
import { palette } from "../styles/theme";

interface ConfimationModalProps {
  open: boolean;
  setOpen: (p: boolean) => void;
  handleClick: () => void;
  isLoading?: boolean;
}

export default function ConfimationModal({
  open,
  setOpen,
  handleClick,
  isLoading,
}: ConfimationModalProps) {
  const handleClose = () => setOpen(false);

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute" as "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          borderRadius: "12px",
          boxShadow: 24,
        }}
      >
        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="space-between"
          pt={2}
        >
          <DeleteOutlined color="error" sx={{ fontSize: "70px" }} />
          <Typography variant="h6" mb={3}>
            Delete Task
          </Typography>
          <Box p={2} bgcolor={palette.secondary.tint} borderRadius="12px">
            <Typography px={5} mb={3}>
              Deleting a task will permanently remove it. Are you sure about
              deleting this?
            </Typography>
            <Box gap={2} display="flex" justifyContent="center" width="100%">
              <Button label="Cancel" color="primary" onClick={handleClose} />
              <Button
                label="Confirm"
                color="error"
                onClick={handleClick}
                isLoading={isLoading}
                variant="contained"
              />
            </Box>
          </Box>
        </Grid>
      </Box>
    </Modal>
  );
}
