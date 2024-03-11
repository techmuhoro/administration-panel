"use client";

import { useId, useLayoutEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import { useNotifyAlertCtx } from "@/components/notify-alert/notify-alert-context";
import http from "@/http";

const validationSchema = Yup.object({
  deptName: Yup.string("Enter name of department")
    .min(4, "Department name should be at least 4 characters")
    .required("Department name is required"),
});

function UpdateModalContent({ item, setModalInitials, closeModal }) {
  const deptInputID = useId();
  const setAlertMessage = useNotifyAlertCtx();
  const router = useRouter();

  useLayoutEffect(() => {
    // Set state explicitly to purge initials that may previously be set
    setModalInitials({
      onConfirmAction: formik.handleSubmit,
      title: "Update Department",
      loading: false,
      confirmText: "Save changes",
      cancelText: "cancel",
    });
  }, [setModalInitials]);

  const formik = useFormik({
    initialValues: {
      deptName: item?.attributes?.name,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      // alert(JSON.stringify(values, null, 2));

      const deptId = item?.id;
      setModalInitials((prev) => {
        return { ...prev, loading: true };
      });
      await http({
        url: `/departments/${deptId}`,
        method: "PUT",
        includeAuthorization: true,
        data: {
          name: values.deptName,
        },
      })
        .then((res) => {
          setAlertMessage("Department updated Successfully", {
            type: "success",
            openDuration: 4000,
          });
          router.refresh();
          closeModal();
        })
        .catch((err) => {
          console.log(err)
          const ServerErrorMsg = err?.response?.data?.error?.message;
          const errorMsg =
            ServerErrorMsg || "Changes to department could not be saved!";

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

export default UpdateModalContent;
