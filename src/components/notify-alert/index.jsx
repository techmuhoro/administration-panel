/* eslint func-names: 0 */
import { Alert, Snackbar } from "@mui/material";
// import PropTypes from "prop-types";
import Slide from "@mui/material/Slide";

import NotifyAlertNode from "./NotifyAlertNode";

const defaults = {
  alertOpen: false,
  alertMessage: "",
  closeFn: undefined,
  alertType: "info",
  openDuration: null,
};

const slideTransition = (props) => {
  return <Slide {...props} direction="left" />;
};

function NotifyAlert({
  alertOpen,
  alertMessage,
  closeFn,
  alertType,
  openDuration,
} = defaults) {
  // const { alertOpen, alertMessage, closeFn, alertType, openDuration } =
  //   useNotifyAlertCtx();

  return (
    <NotifyAlertNode>
      <Snackbar
        open={alertOpen}
        autoHideDuration={openDuration}
        onClose={closeFn}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        TransitionComponent={slideTransition}
      >
        <Alert onClose={closeFn} severity={alertType} sx={{ width: "100%" }}>
          <span>{alertMessage}</span>
        </Alert>
      </Snackbar>
    </NotifyAlertNode>
  );
}

// NotifyAlert.propTypes = {
//   alertOpen: PropTypes.bool,
//   alertMessage: PropTypes.string,
//   closeFn: PropTypes.func,
//   alertType: PropTypes.string,
//   openDuration: PropTypes.number,
//   updateFromctx: PropTypes.bool,
// };

export default NotifyAlert;
