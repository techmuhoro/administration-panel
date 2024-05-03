"use client";

import { useRouter } from "next/navigation";
import AddUserForm from "../forms";
import { Box } from "@mui/material";
import http from "@/http";
import { useNotifyAlertCtx } from "@/components/notify-alert/notify-alert-context";

export default function UpdateUser({ data, derp, userData }) {
  const router = useRouter();
  const setAlertMessage = useNotifyAlertCtx();

  const handleUpdateUser = async (values, { setSubmitting }) => {
    try {
      await http({
        url: `users/${userData?.id}`,
        method: "PUT",
        data: values,
        includeAuthorization: true,
      });

      setAlertMessage("User has updated succesfully", {
        type: "success",
        openDuration: 3000,
      });

      setTimeout(() => {
        router.refresh();
      }, 2000);
    } catch (error) {
      let errorObject = error.response?.data?.error;
      console.log(error);
      let errorKey = [
        "email",
        "message",
        "status",
        "user",
        "name",
        "phone",
        "country",
        "department",
        "role",
      ];
      errorKey.forEach((key) => {
        if (errorObject?.hasOwnProperty(key)) {
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
        userDetails={userData}
        isUpdate={true}
        handleSubmit={handleUpdateUser}
      />
    </Box>
  );
}
