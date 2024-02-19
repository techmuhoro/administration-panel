"use client";

import { createContext, memo, useContext, useMemo } from "react";

import NotifyAlert from "../index.jsx";
import { useNotifyAlert } from "../useNotifyAlert.jsx";

/**
 * @typedef {import("../types.js").alertmsg} alertMsg
 * @typedef {import("../types.js").alertdesc} alertDesc
 */

const alertConfig = {
  /**
   * @type {boolean}
   */
  alertOpen: false,
  /**
   * @type {string}
   */
  alertMessage: "",
  /**
   * @type {?function}
   */
  closeFn: undefined,
  /**
   * @type {string}
   */
  alertType: "info",
  /**
   * @type {?number}
   */
  openDuration: null,
  /**
   * Controls the content/behaviour of global alert component
   * @param {alertMsg} msg
   * @param {...alertDesc} [desc]
   * @returns {void}
   */
  setAlertMessage: (msg, desc) => {},
};

const NotifyAlertContext = createContext(alertConfig);

export default function NotifyAlertProvider({ children }) {
  const { setAlertMessage, alertProps, key } = useNotifyAlert();

  return (
    <NotifyAlertContext.Provider value={{ setAlertMessage }}>
      <NotifyAlert {...alertProps} key={key} />
      {children}
    </NotifyAlertContext.Provider>
  );
}

export function useNotifyAlertCtx() {
  const context = useContext(NotifyAlertContext);

  if (context === undefined) {
    throw new Error(
      "useNotifyAlertCtx must be used within NotifyAlertProvider"
    );
  }
  return context.setAlertMessage;
}
