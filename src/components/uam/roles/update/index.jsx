"use client";

import RoleForm from "../form";
import { useNotifyAlertCtx } from "@/components/notify-alert/notify-alert-context";
import { useRouter } from "next/navigation";
import http from "@/http";

export default function RolesUpdate({ role, departments }) {
  const setAlertMessage = useNotifyAlertCtx();
  const router = useRouter();

  async function handleSubmit(values, { setSubmitting }) {
    const truthyPermissions =
      values?.permissions?.filter((perm) => perm.value) || [];

    const payload = {
      name: values?.name || "",
      department: values?.department || "",
      permissions: truthyPermissions,
    };

    try {
      await http({
        url: `/roles/${role.id}`,
        method: "PUT",
        data: payload,
        includeAuthorization: true,
      }).then((res) => res.data);

      setAlertMessage("Role updated successfully", {
        type: "success",
        openDuration: 3000,
      });

      router.push("/dashboard/roles");
    } catch (error) {
      let msg = error?.httpMessage || "Error! Could update role";

      setAlertMessage(msg, {
        type: "error",
        openDuration: 3000,
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <RoleForm
      handleSubmit={handleSubmit}
      data={role}
      departments={departments}
      isUpdate={true}
    />
  );
}
