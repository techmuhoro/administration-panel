"use client";
import { Input, Select } from "@/atoms/form";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import LoadingButton from "@/atoms/loading-button";
import AddIcon from "@mui/icons-material/Add";

import { Formik, Form } from "formik";
import PermissionForm from "../form";

export default function PermissionsAdd({ categories }) {
  const handleSumnit = (values, { setSubmitting }) => {
    console.log(values);
    console.log("To create");

    const payload = {
      name: "",
      critical: "",
      parentId: values.parentId === "none" ? null : values.parentId,
      description: values?.description || "",
      permissions: values.permissions
        .filter((value) => !!value)
        .map((value) => ({ name: value })),
    };
  };

  return (
    <>
      <PermissionForm handleSubmit={handleSumnit} categories={categories} />
    </>
  );
}
