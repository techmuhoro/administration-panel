"use client";

import { useCallback, useEffect } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import Cookie from "js-cookie";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import DeleteIcon from "@mui/icons-material/Delete";

import { useNotifyAlertCtx } from "@/components/notify-alert/notify-alert-context";

function Delete({ item, setModalContent, setModalInitials, setModalOpen }) {
  const closeModal = useCallback(() => {
    setModalOpen(false);
  }, [setModalOpen]);

  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        columnGap={1}
        onClick={() => {
          setModalOpen(true);
          setModalContent(
            <DeleteContent
              item={item}
              setModalInitials={setModalInitials}
              closeModal={closeModal}
            />
          );
        }}
      >
        <DeleteIcon fontSize="small" />
        <Typography>Delete</Typography>
      </Stack>
    </>
  );
}

export default Delete;

function DeleteContent({ item, setModalInitials, closeModal }) {
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
      onConfirmAction: formik.handleSubmit,
      title: "Confirm: Are you sure you want to delete?",
      loading: false,
      confirmText: "delete",
      cancelText: "cancel",
    });
  }, [setModalInitials]);

  const formik = useFormik({
    initialValues: {
      deptName: item?.attributes?.name,
    },
    onSubmit: async () => {
      const deptId = item?.id;
      config.url = `${config.url}/${deptId}`;
      setModalInitials((prev) => {
        return { ...prev, loading: true };
      });
      await axios(config)
        .then((res) => {
          setAlertMessage("Department Deleted", {
            type: "success",
            openDuration: 4000,
          });
          router.refresh();
          closeModal();
        })
        .catch((err) => {
          if (err?.response?.status === 401) {
            setAlertMessage("Log in required", {
              type: "error",
              openDuration: 4000,
            });
          } else {
            setAlertMessage("Department could not be deleted!", {
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
    },
  });

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
        </span>{" "}
        will be deleted
      </Typography>
    </Box>
  );
}
