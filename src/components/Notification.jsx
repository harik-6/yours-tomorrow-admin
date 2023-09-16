import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function Notification({ show, message, type, onClose }) {
  if (!show) return <></>;
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={show}
      autoHideDuration={3000}
      onClose={onClose}
    >
      <Alert
        variant="filled"
        onClose={onClose}
        elevation={6}
        severity={type}
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
