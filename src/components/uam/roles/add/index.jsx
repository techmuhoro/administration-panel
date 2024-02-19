"use client";

import { BASE_URL } from "@/lib/constants";
import RoleForm from "../form";
import { useRouter } from "next/navigation";
import { useNotifyAlertCtx } from "@/components/notify-alert/notify-alert-context";
import Cookie from "js-cookie";

export default function RolesAdd({ departments, permissions }) {
  const router = useRouter();
  const setAlertMessage = useNotifyAlertCtx();
  const token = Cookie.get("token");

  console.log(permissions);

  async function handleSubmit(values, { setSubmitting }) {
    const truthyPermissions =
      values?.permissions?.filter((perm) => perm.value) || [];

    const payload = {
      name: values?.name || "",
      department: values?.department || "",
      permissions: truthyPermissions,
    };

    const url = `${BASE_URL}roles`;

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (data.statusCode == 200) {
      setAlertMessage("Role has been created successfully", {
        type: "success",
      });

      router.push("/dashboard/roles");
    } else {
      setAlertMessage("Role could not be created!", {
        type: "error",
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
