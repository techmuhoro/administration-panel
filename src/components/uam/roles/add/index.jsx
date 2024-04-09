"use client";

import { useState } from "react";
import { BASE_URL } from "@/lib/constants";
import RoleForm from "../form";
import { useRouter } from "next/navigation";
import { useNotifyAlertCtx } from "@/components/notify-alert/notify-alert-context";
import Cookie from "js-cookie";
import http from "@/http";

export default function RolesAdd({ departments, permissions }) {
  const router = useRouter();
  const setAlertMessage = useNotifyAlertCtx();

  async function handleSubmit(values, { setSubmitting }) {
    const truthyPermissions =
      values?.permissions?.filter((perm) => perm.value) || [];

    const payload = {
      name: values?.name || "",
      department: values?.department || "",
      permissions: truthyPermissions,
    };

    try {
      const response = await http({
        method: "POST",
        url: "/roles",
        data: payload,
        includeAuthorization: true,
      }).then((res) => res.data);

      setAlertMessage("Role has been created successfully", {
        type: "success",
        openDuration: 3000,
      });

      router.push("/dashboard/roles");
    } catch (error) {
      let msg = error?.message || "Error! Could not create role";
      setAlertMessage(msg, {
        type: "error",
        openDuration: 3000,
        closeOnClickAway: true,
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <RoleForm
      handleSubmit={handleSubmit}
      permissions={permissions}
      departments={departments}
    />
  );
}
