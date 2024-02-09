/* eslint func-names: 0 */
import React from "react";

const validNotifyTypes = ["success", "error", "info", "warning"];

function useNotifyAlert(closeFnProp, message) {
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [alertMsg, setAlertMsg] = React.useState({ msg: "" });
  const [alertType, setAlertType] = React.useState("info");
  const [openDuration, setOpenDuration] = React.useState(null);
  const clickAwayClose = React.useRef(false);

  const handleCloseAlert = React.useCallback(function (event, reason) {
    if (reason === "clickaway" && !clickAwayClose.current) {
      return;
    }
    setAlertOpen(false);
  }, []);

  const config = {
    message,
    closeFn: typeof closeFnProp === "function" ? closeFnProp : handleCloseAlert,
  };

  /**
   * @typedef {import("./types.js").alertmsg} alertmsg
   * @typedef {import("./types.js").alertdesc} alertDesc
   */

  const setAlertMessage = React.useCallback(
    /**
     *
     * @param {alertmsg} msg
     * @param {...alertDesc} [desc]
     */
    function (msg, desc) {
      //  .alertmsg
      //   console.log({ msg, desc });
      //   console.groupEnd();
      if (msg) {
        setAlertMsg({ msg: String(msg) });
      } else {
        setAlertMsg({ msg: "" });
      }
      if (typeof desc?.type === "string") {
        const notifyType = desc.type;
        const checkedNotifyType = validNotifyTypes.find(
          (type) => type === notifyType.toLowerCase()
        );
        if (checkedNotifyType) setAlertType(checkedNotifyType);
      }
      if (typeof desc?.openDuration === "number") {
        setOpenDuration(desc.openDuration);
      }
      if (desc?.closeOnClickAway) {
        clickAwayClose.current = true;
      } else {
        clickAwayClose.current = false;
      }
    },
    [setAlertMsg, setAlertType, setOpenDuration]
  );

  React.useEffect(() => {
    const nowMsg = config.message;

    if (nowMsg) {
      setAlertOpen(true);
      setAlertMsg({ msg: nowMsg });
    }
  }, [config.message]);
  React.useEffect(() => {
    if (alertMsg.msg) {
      setAlertOpen(true);
    } else {
      setAlertOpen(false);
    }
  }, [alertMsg]);

  return {
    setAlertMessage,
    alertProps: {
      alertOpen,
      alertMessage: alertMsg.msg,
      closeFn: config.closeFn,
      alertType,
      openDuration,
    },
  };
}

export { useNotifyAlert };
