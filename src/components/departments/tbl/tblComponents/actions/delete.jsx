"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookie from "js-cookie";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import DeleteIcon from "@mui/icons-material/Delete";

import { useNotifyAlertCtx } from "@/components/notify-alert/notify-alert-context";
import http from "@/http";

function Delete({ setActiveAction, setModalOpen }) {
  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        columnGap={1}
        onClick={() => {
          setModalOpen(true);
          setActiveAction("delete");
        }}
      >
        <DeleteIcon fontSize="small" />
        <Typography>Delete</Typography>
      </Stack>
    </>
  );
}

export default Delete;

export function DeleteModalContent({ item, setModalInitials, closeModal }) {
  const setAlertMessage = useNotifyAlertCtx();
  const router = useRouter();

  const athTkn = Cookie.get("token");
  const config = {
    url: `${process.env.NEXT_PUBLIC_API_BASE_URL}departments`,
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${athTkn}`,
    },
  };

  useEffect(() => {
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
    config.url = `${config.url}/${deptId}`;
    setModalInitials((prev) => {
      return { ...prev, loading: true };
    });
    await http(config)
      .then((res) => {
        setAlertMessage("Department Deleted", {
          type: "success",
          openDuration: 4000,
        });
        router.refresh();
        closeModal();
      })
      .catch((err) => {
        const ServerErrorMsg = err?.response?.data?.error?.message;
        const errorMsg = ServerErrorMsg || "Department could not be deleted!";

        if (err?.response?.status === 401) {
          setAlertMessage("Log in required", {
            type: "error",
            openDuration: 4000,
          });
        } else {
          setAlertMessage(errorMsg, {
            type: "error",
            openDuration: 4000,
          });
        }
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
            margin: "0 8px",
            textTransform: "capitalize",
          }}
        >
          {item?.attributes?.name}
        </span>
        will be deleted ⚠️.
        <br />
        Confirm that this is what you want to do.
      </Typography>
    </Box>
  );
}
