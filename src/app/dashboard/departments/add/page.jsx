"use client";

import { useId } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useFormik } from "formik";
import Cookie from "js-cookie";
import TextField from "@mui/material/TextField";
import MUILink from "@mui/material/Link";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import useTheme from "@mui/material/styles/useTheme";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import * as Yup from "yup";
import DoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import { useNotifyAlertCtx } from "@/components/notify-alert/notify-alert-context";

const validationSchema = Yup.object({
  deptName: Yup.string("Enter name of department")
    .min(4, "Department name should be at least 4 characters")
    .required("Department name is required"),
});

function AddDepartment() {
  const searchParams = useSearchParams();
  const appTheme = useTheme();
  const deptInputID = useId();
  const goBackUrl = searchParams.get("prev") || "/dashboard/departments";
  const setAlertMessage = useNotifyAlertCtx();

  const config = {
    url: `${process.env.NEXT_PUBLIC_API_BASE_URL}departments`,
    method: "POST",
  };

  const formik = useFormik({
    initialValues: {
      deptName: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
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
          if (err?.response?.status === 401) {
            setAlertMessage(
              "You are Unathenticated/ not allowed to perform this operation",
              { type: "error", openDuration: 4000 }
            );
          } else {
            setAlertMessage("Department could not be created!", {
              type: "error",
              openDuration: 4000,
            });
          }
          // console.group("Dept not added successfully!");
          // console.error(err);
          // console.groupEnd();
        })
        .finally(() => formik.setSubmitting(false));
    },
  });

  return (
    <Container maxWidth="md">
      <Typography variant="body2" component="div" sx={{ textAlign: "end" }}>
        <MUILink
          component={Link}
          sx={{
            padding: 1,
            display: "inline-flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          // use style attr to override next link styling
          style={{
            color: appTheme.palette.primary.main,
            textDecoration: "underline",
          }}
          href={goBackUrl}
        >
          <DoubleArrowLeftIcon />
          Back
        </MUILink>
      </Typography>
      <Card variant="outlined">
        {/* <CardHeader title="buluu" /> */}
        <Typography
          variant="h5"
          component="div"
          sx={{ padding: 2, textAlign: "center" }}
        >
          New Department
        </Typography>
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          sx={{
            padding: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box>
            <Typography
              variant="body1"
              component="label"
              htmlFor={deptInputID}
              sx={{ mr: 1 }}
            >
              Department Name:
            </Typography>
            <TextField
              // fullWidth
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
          <Box sx={{ mt: 2 }}>
            <Button
              color="primary"
              variant="contained"
              type="submit"
              sx={{ padding: "6px 40px", minWidth: "130px" }}
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? (
                <CircularProgress size={25} color="inherit" />
              ) : (
                "Create"
              )}
            </Button>
          </Box>
        </Box>
      </Card>
    </Container>
  );
}

export default AddDepartment;
