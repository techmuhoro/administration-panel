"use client";

import { useLayoutEffect } from "react";
import { useRouter } from "next/navigation";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import { useNotifyAlertCtx } from "@/components/notify-alert/notify-alert-context";
import http from "@/http";

function DeleteModalContent({ item, setModalInitials, closeModal }) {
  const setAlertMessage = useNotifyAlertCtx();
  const router = useRouter();

  useLayoutEffect(() => {
    setModalInitials({
      onConfirmAction: handleDelete,
      title: "You are about to delete!",
      loading: false,
      confirmText: "delete",
      cancelText: "cancel",
      actionBtnColor: "warning",
    });
  }, [setModalInitials]);

  const handleDelete = async (event) => {
    event?.preventDefault();

    const deptId = item?.id;
    setModalInitials((prev) => {
      return { ...prev, loading: true };
    });
    await http({
      url: `/departments/${deptId}`,
      method: "DELETE",
      includeAuthorization: true,
    })
      .then((res) => {
        setAlertMessage("Department Deleted", {
          type: "success",
          openDuration: 4000,
        });
        router.refresh();
        closeModal();
      })
      .catch((err) => {
        const errorMsg = err?.httpMessage || "Department could not be deleted!";

        setAlertMessage(errorMsg, {
          type: "error",
          openDuration: 4000,
        });
      })
      .finally(() => {
        setModalInitials((prev) => {
          return { ...prev, loading: false };
        });
      });
  };

  return (
    <Box
      sx={{
        padding: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="subtitle1">
        <span
          style={{
            fontWeight: 700,
            textTransform: "capitalize",
          }}
        >
          {item?.attributes?.name}
        </span>
        &ensp;will be deleted&#9888;&#65039;.
        <br />
        Confirm that this is what you want to do.
      </Typography>
    </Box>
  );
}
export default DeleteModalContent;
