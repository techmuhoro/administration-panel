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
import { BASE_URL, ERROR_MSG_LOOKUP } from "@/lib/constants";
import Cookies from "js-cookie";
import { useNotifyAlertCtx } from "@/components/notify-alert/notify-alert-context";
import { usePathname, useRouter } from "next/navigation";

export default function PermissionUpdate({ permission }) {
  const setAlertMessage = useNotifyAlertCtx();
  const authToken = Cookies.get("token");
  const pathname = usePathname();
  const router = useRouter();
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

  const handleUpdate = async (values, { setSubmitting }) => {
    const payload = {
      name: values?.name,
      parentId: permission?.includes?.id || "",
    };

    if (values.parentCritical) {
      payload.parentCritical = values.parentCritical;
    }

    if (values.parentName) {
      payload.parentName = values.parentName;
    }

    if (values.parentDescription) {
      payload.parentDescription = values.parentDescription;
    }

    console.log(payload);

    try {
      const url = `${BASE_URL}permissions/${permission?.id}`;

      // make request
      const response = await fetch(url, {
        method: "PUT",
        body: JSON.stringify(payload),
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      setSubmitting(false);

      console.log(data);
      console.log(response.status);

      if (response.status == 200) {
        let msg = data?.data?.message || "Permission updated successfully!";
        setAlertMessage(msg);
        router.refresh();
        closeModal();
      } else if (response.status == 401) {
        let msg = ERROR_MSG_LOOKUP[401];
        setAlertMessage(msg);
        router.push(`/?&next=${pathname}`);
      } else if ([403, 404, 406, 500].includes(response.status)) {
        let msg = data?.error?.message || ERROR_MSG_LOOKUP[response.status];

        setAlertMessage(msg);

        // handle form error
      } else {
        setAlertMessage("An error occured! Contact system admin for support.");
      }
    } catch (e) {
      setAlertMessage("An error occured! Contact system admin for support");
    }
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    parentName: Yup.string().required("Required"),
    parentCritical: Yup.string()
      .required("Required")
      .oneOf(["false", "true"], "Critical can only be Yes or No"),
    parentDescription: Yup.string().required("Required"),
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
                parentName: permission?.includes?.attributes?.parentName || "",
                parentCritical:
                  permission?.includes?.attributes?.parentCritical || "",
                parentDescription:
                  permission?.includes?.attributes?.parentDescription || "",
              }}
              validationSchema={validationSchema}
              onSubmit={handleUpdate}
            >
              {(form) => (
                <Form>
                  <Stack rowGap={2}>
                    <Input name="name" label="Name" />
                    <Input name="parentName" label="Group Name" />

                    <Select name="parentCritical" label="Critical?">
                      <MenuItem value="false">No</MenuItem>
                      <MenuItem value="true">Yes</MenuItem>
                    </Select>

                    <Input
                      name="parentDescription"
                      label="Parent Description"
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