"use client";

import { useCallback, useState, useRef, useEffect } from "react";
import Grid from "@mui/material/Grid";
import LoadingIndicator from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import DownloadIcon from "@mui/icons-material/Download";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import TableViewIcon from "@mui/icons-material/TableView";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNotifyAlertCtx } from "@/components/notify-alert/notify-alert-context";

function ExportButton({
  variant = "outlined",
  color = "primary",
  label = "Export",
  handleExport,
}) {
  const menuTriggerBtnRef = useRef(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [exportFormat, setExportFormat] = useState("");
  const open = Boolean(anchorEl);

  const setExportFormatState = useCallback(
    (format) => {
      setExportFormat(format);
    },
    [setExportFormat]
  );

  const handleMenuOpen = () => {
    if (menuTriggerBtnRef.current) setAnchorEl(menuTriggerBtnRef.current);
  };
  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <Button
        startIcon={<DownloadIcon />}
        variant={variant}
        color={color}
        onClick={handleMenuOpen}
        ref={menuTriggerBtnRef}
        size="small"
      >
        {label}
      </Button>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        // onClick={handleClose}
        // PaperProps={{
        //   elevation: 0,
        //   sx: exportDropDown,
        // }}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
      >
        {!exportFormat ? (
          <ExportFormatPrompt
            setFormat={setExportFormatState}
            handleClose={handleClose}
          />
        ) : (
          <ExportDatesPrompt
            exportFormat={exportFormat}
            setExportFormat={setExportFormatState}
            handleClose={handleClose}
            handleMenuOpen={handleMenuOpen}
            handleExport={handleExport}
          />
        )}
      </Menu>
    </>
  );
}

export default ExportButton;

function ExportFormatPrompt({ handleClose, setFormat }) {
  return (
    <>
      <Typography variant="subtitle2" textAlign="center" color="primary">
        EXPORT IN
      </Typography>
      <Divider />
      <Stack direction="column" sx={{ px: "10px", my: "10px" }}>
        <MenuItem
          onClick={() => {
            setFormat("xlsx");
          }}
        >
          <TableViewIcon />
          <Typography sx={{ ml: 2 }}>EXCEL</Typography>
        </MenuItem>
        <MenuItem
          onClick={() => {
            setFormat("csv");
          }}
        >
          <ClearAllIcon />
          <Typography sx={{ ml: 2 }}>CSV</Typography>
        </MenuItem>
        <MenuItem
          onClick={() => {
            setFormat("pdf");
          }}
        >
          <PictureAsPdfIcon />
          <Typography sx={{ ml: 2 }}>PDF</Typography>
        </MenuItem>
      </Stack>
      <Button
        fullWidth
        color="secondary"
        variant="text"
        size="small"
        sx={{ textTransform: "none" }}
        onClick={handleClose}
      >
        Cancel
      </Button>
    </>
  );
}

const dateFieldsSchema = yup.object({
  fromDate: yup
    .date()
    .typeError("Invalid date")
    .required("FROM date is required"),
  toDate: yup
    .date()
    .typeError("Invalid date")
    .required("TO date is required")
    .default(() => new Date()),
});
const today = new Date(),
  todayDate = `${today.getFullYear()}-${(today.getMonth() + 1).toString(10).padStart(2, "0")}-${today.getDate().toString(10).padStart(2, "0")}`;
function ExportDatesPrompt({
  exportFormat,
  setExportFormat,
  handleClose,
  handleMenuOpen,
  handleExport,
}) {
  const setAlertMessage = useNotifyAlertCtx();

  useEffect(() => {
    // Important! This makes the Menu re-adjust its dimensions
    handleMenuOpen();
  }, []);

  const formikBag = useFormik({
    initialValues: {
      fromDate: "",
      toDate: todayDate,
    },
    validationSchema: dateFieldsSchema,
    onSubmit: async (values, actions) => {
      // alert(JSON.stringify(values, null, 2));
      try {
        const [fileFormat, downloadUrl] = await handleExport({
          from: values.fromDate,
          to: values?.toDate,
          format: exportFormat,
        });

        setAlertMessage("Your file will download shortly 🎉", {
          type: "success",
          openDuration: 8000,
          closeOnClickAway: true,
        });
        actions.setSubmitting(false);

        const link = document.createElement("a");
        const crumbleTxt = parseInt(Math.random() * 1e12, 10)
          .toString(36)
          .substring(4, 10);
        link.href = downloadUrl;
        link.hidden = true;
        link.setAttribute(
          "download",
          `Ipay_Account_activity_logs(${values.fromDate}_to_${values.toDate})_${crumbleTxt}.${fileFormat}`
        );
        document.body.appendChild(link);
        setTimeout(() => {
          link.click();
        }, 2200);

        handleClose();
      } catch (error) {
        console.group("Handle Export error");
        console.log(error?.message);
        console.groupEnd();
        setAlertMessage(
          "Oh no! Your file could not be generated at this time. Please try again later.",
          {
            type: "error",
            openDuration: 5000,
            closeOnClickAway: true,
          }
        );
        handleClose();
      }
    },
  });

  return (
    <div style={{ padding: "5px 10px", width: "340px" }}>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          variant="body1"
          sx={{
            textTransform: "uppercase",
            whiteSpace: "nowrap",
            marginRight: "15px",
            color: "primary.main",
          }}
        >
          Exporting to {exportFormat}
        </Typography>
        <Button
          variant="text"
          size="small"
          sx={{ textDecoration: "underline", color: "primary.main" }}
          onClick={() => setExportFormat("")}
        >
          {"<back"}
        </Button>
      </div>

      <Divider sx={{ width: "100%", margin: "5px 0" }} />

      <Typography variant="body2" sx={{ my: 2 }}>
        Dates you want your data generated
      </Typography>

      <Grid container sx={{ mb: 2 }}>
        <Grid item sm={12} md={5}>
          <TextField
            type="date"
            label="From Date"
            size="small"
            name="fromDate"
            placeholder="YYYY-MM-DD"
            value={formikBag.values.fromDate}
            onChange={formikBag.handleChange}
            onBlur={formikBag.handleBlur}
            error={
              formikBag.touched.fromDate && Boolean(formikBag.errors.fromDate)
            }
            helperText={formikBag.touched.fromDate && formikBag.errors.fromDate}
            InputProps={{ sx: { fontSize: "14px" } }}
            inputProps={{
              max: todayDate,
            }}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <span style={{ fontWeight: 700, marginInline: "12px" }}>-</span>
        <Grid item sm={12} md={5}>
          <TextField
            type="date"
            label="To Date"
            size="small"
            name="toDate"
            placeholder="YYYY-MM-DD"
            value={formikBag.values.toDate}
            onChange={formikBag.handleChange}
            onBlur={formikBag.handleBlur}
            error={formikBag.touched.toDate && Boolean(formikBag.errors.toDate)}
            helperText={formikBag.touched.toDate && formikBag.errors.toDate}
            InputProps={{ sx: { fontSize: "14px" } }}
            inputProps={{
              max: todayDate,
            }}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
      </Grid>

      <div
        className="export-action-btns"
        style={{
          display: "flex",
          // justifyContent: "stretch",
          // alignItems: "stretch",
          flexDirection: "row",
        }}
      >
        <Button
          variant="contained"
          sx={{ flexGrow: 1 }}
          onClick={formikBag.handleSubmit}
          disabled={formikBag.isSubmitting}
        >
          {formikBag.isSubmitting ? (
            <LoadingIndicator color="inherit" size={20} />
          ) : (
            "Export"
          )}
        </Button>
        <Button
          color="secondary"
          variant="outlined"
          size="small"
          sx={{ textTransform: "none", flexGrow: 1 }}
          onClick={handleClose}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}
