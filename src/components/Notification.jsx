import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function Notification({ show, message, type, onClose = null }) {
  const [open, setOpen] = React.useState(true);

  const handleOnClose = () => {
    setOpen(false);
    if (onClose !== null) onClose();
  };

  if (!show) return <></>;
  
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={open}
      autoHideDuration={6000}
      onClose={handleOnClose}
    >
      <Alert
        variant="filled"
        onClose={handleOnClose}
        elevation={6}
        severity={type}
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
