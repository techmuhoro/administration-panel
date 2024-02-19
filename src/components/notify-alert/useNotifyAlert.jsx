/* eslint func-names: 0 */
import React from "react";

const validNotifyTypes = ["success", "error", "info", "warning"];
function keyGen() {
  return parseInt(Math.random() * 1e12).toString(36);
}

function useNotifyAlert(closeFnProp, message) {
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [alertMsg, setAlertMsg] = React.useState({ msg: "" });
  // const [alertType, setAlertType] = React.useState("info");
  // const [openDuration, setOpenDuration] = React.useState(null);
  const clickAwayClose = React.useRef(false);
  const openDuration = React.useRef(null);
  const alertType = React.useRef("info");
  const key = React.useRef(keyGen());

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
      // Changing the ref attributes
      // Helps minimize alot of rerenders had we used react state
      if (desc?.closeOnClickAway) {
        clickAwayClose.current = true;
      } else {
        clickAwayClose.current = false;
      }

      if (typeof desc?.openDuration === "number") {
        openDuration.current = desc.openDuration;
      } else {
        openDuration.current = null;
      }

      if (typeof desc?.type === "string") {
        const notifyType = desc.type;
        const checkedNotifyType = validNotifyTypes.find(
          (type) => type === notifyType.toLowerCase()
        );
        checkedNotifyType
          ? (alertType.current = checkedNotifyType)
          : (alertType.current = "info");
      }

      // Set rerenders
      // Important: Set refs b4 rerenders so during a rerender, DOM elems can have updated values
      if (typeof msg === "string" && msg.length) {
        key.current = keyGen();
        setAlertMsg({ msg: msg });
        setAlertOpen(true);
      } else {
        key.current = keyGen();
        setAlertMsg({ msg: "" });
        setAlertOpen(false);
      }
    },
    [setAlertMsg]
  );

  React.useEffect(() => {
    const nowMsg = config.message;

    if (nowMsg) {
      setAlertOpen(true);
      setAlertMsg({ msg: nowMsg });
    }
  }, [config.message]);

  return {
    setAlertMessage,
    alertProps: {
      alertOpen: alertOpen,
      alertMessage: alertMsg.msg,
      closeFn: config.closeFn,
      alertType: alertType.current,
      openDuration: openDuration.current,
    },
    key: key.current,
  };
}

export { useNotifyAlert };
