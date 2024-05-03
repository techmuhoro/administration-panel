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
import http from "@/http";

export default function PermissionsAdd({ categories }) {
  const setAlertMessage = useNotifyAlertCtx();
  const router = useRouter();

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

    try {
      await http({
        url: "/permissions",
        method: "POST",
        data: payload,
        includeAuthorization: true,
      }).then((res) => res.data);

      let msg = "Permission create successfully";
      setAlertMessage(msg, { type: "success", openDuration: 3000 });

      router.push("/dashboard/permissions");
    } catch (error) {
      let msg = error?.httpMessage || "Error! Could not add permission(s)";
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
