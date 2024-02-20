"use client";

import { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";

import { Formik, Form } from "formik";
import { Input, Select } from "@/atoms/form";
import * as Yup from "yup";
import LoadingButton from "@/atoms/loading-button";
import { BASE_URL } from "@/lib/constants";

export default function PermissionUpdate({ permission }) {
  const [open, setOpen] = useState(false);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  console.log("permission", permission);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: 400,
    bgcolor: "background.paper",
    // border: "1px solid #000",
    borderRadius: "5px",
    boxShadow: 24,
    p: 4,
  };

  const handleUpdate = (values, { setSubmitting }) => {
    // updating logic
    console.log("Update permission");

    const payload = {
      name: values?.name,
      critical: values?.critical,
      parentId: permission?.attributes?.parentId,
      description: values?.description,
    };

    const url = `${BASE_URL}permissions/${permission?.id}`;

    // make a fetch request

    console.log(url);
    console.log(payload);
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    critical: Yup.string()
      .required("Required")
      .oneOf(["0", "1"], "Critical can only be Yes or No"),
    description: Yup.string().required("Required"),
  });

  return (
    <>
      <MenuItem onClick={openModal}>
        <Stack direction="row" alignItems={"center"} columnGap={1}>
          <EditIcon sx={{ fontSize: "1rem" }} />
          <Typography>Update</Typography>
        </Stack>
      </MenuItem>

      <>
        <Modal
          open={open}
          onClose={closeModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={{ ...style }}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              mb={1}
            >
              Update Permission - {permission?.attributes?.name}
            </Typography>

            <Formik
              initialValues={{
                name: permission?.attributes?.name || "",
                critical: "0",
                description: permission?.attributes?.description || "",
              }}
              validationSchema={validationSchema}
              onSubmit={handleUpdate}
            >
              {(form) => (
                <Form>
                  <Stack rowGap={2}>
                    <Input name="name" label="Name" />

                    <Select name="critical" label="Critical?">
                      <MenuItem value="0">No</MenuItem>
                      <MenuItem value="1">Yes</MenuItem>
                    </Select>

                    <Input
                      name="description"
                      label="Description"
                      multiline
                      minRows={2}
                      maxRows={4}
                    />

                    <LoadingButton
                      variant="contained"
                      color="primary"
                      loading={form.isSubmitting}
                      type="submit"
                    >
                      Update
                    </LoadingButton>
                  </Stack>
                </Form>
              )}
            </Formik>
          </Box>
        </Modal>
      </>
    </>
  );
}
