"use client";

import { useCallback, useState } from "react";
import Cookie from "js-cookie";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";

import AddNew from "@/atoms/button/add-new";
import DeptModal from "./dialog-modal";
import { useNotifyAlertCtx } from "@/components/notify-alert/notify-alert-context";

const config = {
  url: `${process.env.NEXT_PUBLIC_API_BASE_URL}departments`,
  method: "POST",
};
const validationSchema = Yup.object({
  deptName: Yup.string("Enter name of department")
    .min(4, "Department name should be at least 4 characters")
    .required("Department name is required"),
});

function CreateBtn() {
  const [modalOpen, setModalOpen] = useState(false);
  const setAlertMessage = useNotifyAlertCtx();

  const handleCloseModal = useCallback(() => {
    setModalOpen(false);
  }, [setModalOpen]);

  const handleAddDept = async (values, actions) => {
    // alert(JSON.stringify(values, null, 2));
    const athTkn = Cookie.get("token");
    config.headers = {
      Authorization: `Bearer ${athTkn}`,
    };
    config.data = {
      name: values.deptName,
    };
    await axios(config)
      .then((res) => {
        setAlertMessage("Department Added Successfully", {
          type: "success",
          openDuration: 4000,
        });
      })
      .catch((err) => {
        const msg =
          err?.response?.data?.error?.message ||
          "Department could not be created!";
        // console.log({ "err-MSG": msg });
        if (err?.response?.status === 401) {
          setAlertMessage("Log in required", {
            type: "error",
            openDuration: 4000,
          });
        } else {
          setAlertMessage(msg, {
            type: "error",
            openDuration: 4000,
          });
        }
        // console.group("Dept not added successfully!");
        // console.error(err);
        // console.groupEnd();
      })
      .finally(() => actions.setSubmitting(false));
  };

  const formik = useFormik({
    initialValues: {
      deptName: "",
    },
    validationSchema: validationSchema,
    onSubmit: handleAddDept,
  });

  return (
    <>
      <AddNew
        text="create"
        sx={{ textTransform: "capitalize", color: "#ffffff !important" }}
        // component={Link}
        // href={`/dashboard/departments/add${searchParams ? "?prev=" + encodeURIComponent(pageHref) : ""}`}
        onClick={() => setModalOpen(true)}
      />

      <DeptModal
        title="Add a new Department"
        open={modalOpen}
        onConfirmAction={formik.handleSubmit}
        handleClose={handleCloseModal}
        confirmText="Add Now"
        loading={formik.isSubmitting}
      >
        <TextField
          fullWidth
          name="deptName"
          label="Department Name"
          // InputLabelProps={{ shrink: true }}
          // placeholder="Enter Department Name"
          value={formik.values.deptName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.deptName && Boolean(formik.errors.deptName)}
          helperText={formik.touched.deptName && formik.errors.deptName}
        />
      </DeptModal>
    </>
  );
}

export default CreateBtn;
