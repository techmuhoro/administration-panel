"use client";

import { useId, useEffect, useCallback } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import Cookie from "js-cookie";
import axios from "axios";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import EditIcon from "@mui/icons-material/Edit";

import { useNotifyAlertCtx } from "@/components/notify-alert/notify-alert-context";

const validationSchema = Yup.object({
  deptName: Yup.string("Enter name of department")
    .min(4, "Department name should be at least 4 characters")
    .required("Department name is required"),
});

function Update({ item, setModalContent, setModalInitials, setModalOpen }) {
  const closeModal = useCallback(() => {
    setModalOpen(false);
  }, [setModalOpen]);

  return (
    <Stack
      direction="row"
      alignItems="center"
      columnGap={1}
      onClick={() => {
        setModalOpen(true);
        setModalContent(
          <FormContent
            item={item}
            setModalInitials={setModalInitials}
            closeModal={closeModal}
          />
        );
      }}
    >
      <EditIcon fontSize="small" />
      <Typography>Update</Typography>
    </Stack>
  );
}

export default Update;

function FormContent({ item, setModalInitials, closeModal }) {
  const deptInputID = useId();
  const setAlertMessage = useNotifyAlertCtx();
  const router = useRouter();

  const athTkn = Cookie.get("token");
  const config = {
    url: `${process.env.NEXT_PUBLIC_API_BASE_URL}departments`,
    method: "PUT",
    headers: {
      Authorization: `Bearer ${athTkn}`,
    },
  };

  useEffect(() => {
    setModalInitials((prev) => {
      // Set explicitly state needed in the modal without spread(...)
      // To purge state that is not specific to this modal
      return {
        onConfirmAction: formik.handleSubmit,
        title: "Update Department",
        loading: false,
        confirmText: "Save changes",
        cancelText: "cancel",
      };
    });
  }, [setModalInitials]);

  const formik = useFormik({
    initialValues: {
      deptName: item?.attributes?.name,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      // alert(JSON.stringify(values, null, 2));

      config.data = {
        name: values.deptName,
      };
      const deptId = item?.id;
      config.url = `${config.url}/${deptId}`;
      setModalInitials((prev) => {
        return { ...prev, loading: true };
      });
      await axios(config)
        .then((res) => {
          setAlertMessage("Department updated Successfully", {
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
            setAlertMessage("Changes to department could not be saved!", {
              type: "error",
              openDuration: 4000,
            });
          }
          // console.group("Dept not added successfully!");
          // console.error(err);
          // console.groupEnd();
        })
        .finally(() => {
          // formik.setSubmitting(false);
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
      <TextField
        fullWidth
        id={deptInputID}
        name="deptName"
        label="Name"
        value={formik.values.deptName}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.deptName && Boolean(formik.errors.deptName)}
        helperText={formik.touched.deptName && formik.errors.deptName}
      />
    </Box>
  );
}
