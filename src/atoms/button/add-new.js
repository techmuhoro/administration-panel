import React from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

/**
 * @typedef {import("@mui/material").ButtonProps} MuiBtnProps
 *
 * @typedef {object} BtnProps
 * @property {string} [text="Add"] Text to show in button
 *
 * @typedef {MuiBtnProps & BtnProps} AddNewProps
 */

/**
 *
 * @param {AddNewProps} btnProps
 * @returns {React.ElementType}
 */
export default function AddNew(btnProps) {
  const { text = "Add", ...restProps } = btnProps;

  return (
    <Button startIcon={<AddIcon />} variant="contained" {...restProps}>
      {text}
    </Button>
  );
}
