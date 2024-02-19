"use client";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { Formik, Form } from "formik";

export default function PermissionsAdd() {
  return (
    <>
      <Box>
        <Typography component="h1" variant="h5" mb={1}>
          Create a new role
        </Typography>

        <Box
          sx={{
            // border: "1px solid gray",
            maxWidth: "600px",
            mx: "auto",
            borderRadius: "5px",
          }}
        >
          <Typography>Add New Permission</Typography>
        </Box>
      </Box>
    </>
  );
}
