"use client";

import { useState } from "react";
import { BASE_URL } from "@/lib/constants";
import RoleForm from "../form";
import { useRouter } from "next/navigation";
import { useNotifyAlertCtx } from "@/components/notify-alert/notify-alert-context";
import Cookie from "js-cookie";

export default function RolesAdd({ departments, permissions }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const setAlertMessage = useNotifyAlertCtx();
  const token = Cookie.get("token");

  async function handleSubmit(values, { setSubmitting }) {
    const truthyPermissions =
      values?.permissions?.filter((perm) => perm.value) || [];

    const payload = {
      name: values?.name || "",
      department: values?.department || "",
      permissions: truthyPermissions,
    };
    const url = `${BASE_URL}roles`;
    console.log(url);
    console.log(payload);

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    setSubmitting(false);

    if (data.statusCode == 200) {
      setAlertMessage("Role has been created successfully", {
        type: "success",
        openDuration: 3000,
      });

      return router.push("/dashboard/roles");
    } else if (data.statusCode == 406) {
      // handle form error

      // use formik setField errors to set Errors
      setAlertMessage("Kindly reactify errors in your form!", {
        type: "error",
        openDuration: 3000,
      });
    } else {
      const error = data.error.message || "Error! could not create role";

      setAlertMessage(error, {
        type: "error",
        openDuration: 3000,
      });
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
