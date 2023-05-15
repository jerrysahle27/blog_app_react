import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import React from "react";
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export interface AlertNotificationProps {
  openSuccess: boolean;
  openError: boolean;
  message: string;
  setOpenSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenError: React.Dispatch<React.SetStateAction<boolean>>;
  children?: React.ReactNode;
}
function AlertNotification(props: AlertNotificationProps) {
  const handleSnackbarClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    props.openSuccess === true
      ? props.setOpenSuccess(false)
      : props.setOpenError(false);
  };

  return (
    <>
      <Snackbar
        open={props.openSuccess}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          {props.message}
        </Alert>
      </Snackbar>
      <Snackbar
        open={props.openError}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="error"
          sx={{ width: "100%" }}
        >
          Something went wrong !
        </Alert>
      </Snackbar>
    </>
  );
}

export default AlertNotification;
