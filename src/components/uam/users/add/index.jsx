"use client";

import { useRouter } from "next/navigation";
import AddUserForm from "../forms";
import { Box } from "@mui/material";
import http from "@/http";
import { useNotifyAlertCtx } from "@/components/notify-alert/notify-alert-context";

export default function AddUser({ data, derp }) {
  const router = useRouter();
  const setAlertMessage = useNotifyAlertCtx();

  const handleAddUser = async (values, { setSubmitting }) => {
    try {
      await http({
        url: `/users`,
        method: "POST",
        data: values,
        includeAuthorization: true,
      });

      setAlertMessage("User has been created successfully", {
        type: "success",
        openDuration: 3000,
      });

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.log(error?.response);
      let errorObject = error.response?.data?.error;

      let errorKey = [
        "email",
        "user",
        "name",
        "phone",
        "country",
        "department",
        "role",
      ];

      errorKey.forEach((key) => {
        if (errorObject.hasOwnProperty(key)) {
          setAlertMessage(errorObject[key], {
            type: "error",
            openDuration: 3000,
          });
        }
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box>
      <AddUserForm
        rolesData={data}
        departmentData={derp}
        isUpdate={false}
        handleSubmit={handleAddUser}
      />
    </Box>
  );
}
