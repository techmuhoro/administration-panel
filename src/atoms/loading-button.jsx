"use client";

import { forwardRef } from "react";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

/**
 * @typedef {Object} myBtnProps
 * @property {boolean} loading
 */

const LoadingButton = forwardRef(
  /**
   *
   * @param {import("@mui/material").ButtonProps & myBtnProps} props
   */
  function ({ variant = "contained", loading, ...restProps }, ref) {
    return (
      <Button
        variant={variant}
        disabled={loading}
        sx={{ position: "relative" }}
        ref={ref}
        {...restProps}
      >
        {restProps.children}
        {loading && (
          <CircularProgress
            size={12}
            sx={{
              color: "#474747",
              position: "absolute",
            }}
          />
        )}
      </Button>
    );
  }
);

export default LoadingButton;
