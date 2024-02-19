"use client";

import { BASE_URL } from "@/lib/constants";
import RoleForm from "../form";
import { useRouter } from "next/navigation";
import { useNotifyAlertCtx } from "@/components/notify-alert/notify-alert-context";

const token = `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJ7XCJpZFwiOlwidHl1aW9vamhnNjc4OVwifSIsImlhdCI6MTcwODA3NzcxNiwiZXhwIjoxNzA4MTA2NTE2fQ.9Py3LLg7HerSqSNe5biv8ehK7fkCWINJA0MHIYLbW9E`;

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

    const url = `${BASE_URL}roles`;

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json({});
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
