"use client";
import { Provider } from "react-redux";

import { store } from "./store";
import NotifyAlertProvider from "../components/notify-alert/notify-alert-context";

export function Providers({ children }) {
  return (
    <Provider store={store}>
      <NotifyAlertProvider>{children}</NotifyAlertProvider>
    </Provider>
  );
}
