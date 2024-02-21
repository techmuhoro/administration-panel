"use client";

import { BASE_URL } from "@/lib/constants";
import RoleForm from "../form";
import Cookies from "js-cookie";
import { useNotifyAlertCtx } from "@/components/notify-alert/notify-alert-context";
import { usePathname, useRouter } from "next/navigation";

export default function RolesUpdate({ role, departments }) {
  const setAlertMessage = useNotifyAlertCtx();
  const router = useRouter();
  const pathname = usePathname();
  const authToken = Cookies.get("token");

  async function handleSubmit(values, { setSubmitting }) {
    const truthyPermissions =
      values?.permissions?.filter((perm) => perm.value) || [];

    const payload = {
      name: values?.name || "",
      department: values?.department || "",
      permissions: truthyPermissions,
    };
    console.log(payload);

    const url = `${BASE_URL}roles/${role.id}`;

    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(payload),
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log(data);

    // success case
    if (response.status == 200) {
      setAlertMessage("Role updated successfully", {
        type: "success",
        openDuration: 3000,
      });

      router.push("/dashboard/roles");
    }
    //unathenticated
    else if (response.status == 401) {
      return router.push(`/?next=${pathname}`);
    }
    // form error
    else if (response.status == 406) {
      // set errors with setFieldError
      setAlertMessage("There were errors in your form", {
        type: "info",
        openDuration: 3000,
      });
    }
    // unathorized
    else if (response.status == 403) {
      setAlertMessage("You do not have permission to perform this action", {
        type: "error",
        openDuration: 3000,
      });
    } else if (response.status == 500) {
      setAlertMessage(
        "An Internal server error occurred when processing your request",
        {
          type: "error",
          openDuration: 3000,
        }
      );
    }

    setSubmitting(false);
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
