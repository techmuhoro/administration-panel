"use client";
import { Input, Select } from "@/atoms/form";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import LoadingButton from "@/atoms/loading-button";
import AddIcon from "@mui/icons-material/Add";
import { useNotifyAlertCtx } from "@/components/notify-alert/notify-alert-context";
import Cookies from "js-cookie";
import { useRouter, usePathname } from "next/navigation";

import { Formik, Form } from "formik";
import PermissionForm from "../form";
import { BASE_URL } from "@/lib/constants";

export default function PermissionsAdd({ categories }) {
  const setAlertMessage = useNotifyAlertCtx();
  const router = useRouter();
  const pathname = usePathname();
  const authToken = Cookies.get("token");

  const handleSumnit = async (values, { setSubmitting }) => {
    const permissions = values.permissions
      .filter((value) => !!value)
      .map((value) => ({ name: value }));

    if (permissions.length < 1) {
      setAlertMessage("Kindly include at least one permission", {
        type: "error",
        openDuration: 3000,
      });
      setSubmitting(false);
      return;
    }

    const payload = {
      name: values.parentId === "none" ? values.name : "",
      critical: values.parentId === "none" ? values.critical : "",
      parentId: values.parentId === "none" ? "null" : values.parentId,
      description: values.parentId === "none" ? values.description : "",
      permissions,
    };

    const url = `${BASE_URL}permissions`;
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      // success
      if (response.status == 200) {
        let msg = data?.data?.message || "Permission create successfully";
        setAlertMessage(msg, { type: "success", openDuration: 3000 });
        router.push("/dashboard/permissions");
      }
      // unathenticated
      else if (response.status == 401) {
        router.push(`/?next=${pathname}`);
      }
      // unauthorized
      else if (response.status == 403) {
        let msg =
          data?.error?.message ||
          "You do not have permission to perform this action";
        setAlertMessage(msg, { type: "error", openDuration: 3000 });
      }
      // form error
      else if (response.status == 406) {
        let msg = "Your form contains errors";
        setAlertMessage(msg, { type: "error", openDuration: 3000 });
        // setError with setField errors
      } else if (response.status.toString().startsWith("5")) {
        let msg = "An Internal server error occured";
        setAlertMessage(msg, { type: "error", openDuration: 3000 });
      } else {
        let msg = "An error occurred! Contact Admin for support";
        setAlertMessage(msg, { type: "error", openDuration: 3000 });
      }
    } catch (error) {
      let msg = "An error occurred! Contact Admin for support.";
      setAlertMessage(msg, { type: "error", openDuration: 3000 });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <PermissionForm handleSubmit={handleSumnit} categories={categories} />
    </>
  );
}
