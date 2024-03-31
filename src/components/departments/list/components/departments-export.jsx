"use client";

import { Field, Form, Formik } from "formik";
import * as yup from "yup";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";
import Typography from "@mui/material/Typography";
import DownloadIcon from "@mui/icons-material/Download";
import Grid from "@mui/material/Grid";

// import ExportButton from "./export-btn";
import PopoverMenuBtn from "@/atoms/PopoverMenuBtn";
import { CsvIcon, ExcelIcon, PdfIcon } from "@/assets/svgIcons";
import { useNotifyAlertCtx } from "@/components/notify-alert/notify-alert-context";
import LoadingButton from "@/atoms/loading-button";
import http from "@/http";

const config = {
  url: "/departments/export/",
  method: "GET",
};

function DepartmentsExport() {
  async function handleExport({ from, to, format }) {
    config.params = { format, from, to };
    config.responseType = "blob";
    try {
      const response = await http({ ...config, includeAuthorization: true });

      const url = window.URL.createObjectURL(new Blob([response.data]));

      return [format, url];
    } catch (error) {
      throw error;
    }
  }

  return (
    <PopoverMenuBtn
      icon={DownloadIcon}
      renderMenu={({ closeMenu }) => {
        return <Export handleClose={closeMenu} handleExport={handleExport} />;
      }}
      title="Exports"
      variant="outlined"
      sx={{ ml: 1 }}
    >
      Export
    </PopoverMenuBtn>
  );
}

export default DepartmentsExport;

const exportsSchema = yup.object({
  fromDate: yup
    .date()
    .typeError("Invalid date")
    .required("FROM date is required"),
  toDate: yup.date().typeError("Invalid date").required("TO date is required"),
  // .default(() => new Date()),
  format: yup
    .string()
    .required("Please choose an export format from options below"),
});

const today = new Date(),
  todayDate = `${today.getFullYear()}-${(today.getMonth() + 1).toString(10).padStart(2, "0")}-${today.getDate().toString(10).padStart(2, "0")}`;

const exportsInitialValues = {
  fromDate: "",
  toDate: todayDate,
  format: "",
};

function Export({ handleClose, handleExport }) {
  const setAlertMessage = useNotifyAlertCtx();

  return (
    <Box sx={{ mt: 2, width: "500px" }}>
      <Formik
        initialValues={exportsInitialValues}
        validationSchema={exportsSchema}
        onSubmit={async (values, actions) => {
          try {
            const [fileFormat, downloadUrl] = await handleExport({
              from: values.fromDate,
              to: values?.toDate,
              format: values?.format,
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
              `Ipay_Departments_List(${values.fromDate}_to_${values.toDate})_${crumbleTxt}.${fileFormat}`
            );
            document.body.appendChild(link);
            setTimeout(() => {
              link.click();
            }, 2200);

            handleClose();
          } catch (err) {
            const errorMsg =
              err?.httpMessage ||
              "Your file could not be generated at this time. Please try again later!";
            setAlertMessage(errorMsg, {
              type: "error",
              openDuration: 4000,
              closeOnClickAway: true,
            });
            handleClose();
          }
        }}
      >
        {(props) => (
          <Form>
            <Grid container>
              <Grid item xs={12} sm={6}>
                <Box sx={{ padding: "2px 10px" }}>
                  <Field name="fromDate">
                    {({ field, meta }) => (
                      <TextField
                        type="date"
                        label="From Date"
                        size="small"
                        placeholder="YYYY-MM-DD"
                        fullWidth
                        {...field}
                        error={meta.touched && !!meta.error}
                        helperText={meta.touched && meta.error}
                        InputProps={{ sx: { fontSize: "14px" } }}
                        inputProps={{
                          max: todayDate,
                        }}
                        InputLabelProps={{ shrink: true }}
                      />
                    )}
                  </Field>
                </Box>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Box sx={{ padding: "2px 10px" }}>
                  <Field name="toDate">
                    {({ field, meta }) => (
                      <TextField
                        type="date"
                        label="To Date"
                        size="small"
                        placeholder="YYYY-MM-DD"
                        fullWidth
                        {...field}
                        error={meta.touched && !!meta.error}
                        helperText={meta.touched && meta.error}
                        InputProps={{ sx: { fontSize: "14px" } }}
                        inputProps={{
                          max: todayDate,
                        }}
                        InputLabelProps={{ shrink: true }}
                      />
                    )}
                  </Field>
                </Box>
              </Grid>

              <Grid item sm={12} sx={{ mt: 2, padding: "2px 10px" }}>
                {/* EXPORT FORMAT SELECTION */}
                <Field name="format">
                  {({ field, form, meta, props }) => (
                    <FormControl error={meta.touched && !!meta.error}>
                      <FormLabel
                        id="choose-export-format"
                        sx={{ ...(meta.value && { color: "primary.main" }) }}
                      >
                        {meta.value
                          ? `${String(meta.value).toUpperCase()} format chosen`
                          : "Choose Export Format"}
                      </FormLabel>
                      {meta.touched && meta.error && (
                        <FormHelperText>{meta.error}</FormHelperText>
                      )}

                      <RadioGroup
                        aria-labelledby="choose-export-format"
                        name="export-format-radio-buttons-group"
                        {...field}
                      >
                        <FormControlLabel
                          value="xlsx"
                          control={
                            <Radio
                              sx={{
                                "& .MuiSvgIcon-root": {
                                  fontSize: 20,
                                },
                              }}
                            />
                          }
                          label={
                            <Typography
                              variant="body2"
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                textTransform: "uppercase",
                                fontWeight: 500,
                              }}
                            >
                              <ExcelIcon />
                              &nbsp;Excel
                            </Typography>
                          }
                        />

                        <FormControlLabel
                          value="csv"
                          control={
                            <Radio
                              sx={{
                                "& .MuiSvgIcon-root": {
                                  fontSize: 20,
                                },
                              }}
                            />
                          }
                          label={
                            <Typography
                              variant="body2"
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                textTransform: "uppercase",
                                fontWeight: 500,
                              }}
                            >
                              <CsvIcon />
                              &nbsp;Csv
                            </Typography>
                          }
                        />

                        <FormControlLabel
                          value="pdf"
                          control={
                            <Radio
                              sx={{
                                "& .MuiSvgIcon-root": {
                                  fontSize: 20,
                                },
                              }}
                            />
                          }
                          label={
                            <Typography
                              variant="body2"
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                textTransform: "uppercase",
                                fontWeight: 500,
                              }}
                            >
                              <PdfIcon />
                              &nbsp;Pdf
                            </Typography>
                          }
                        />
                      </RadioGroup>
                    </FormControl>
                  )}
                </Field>
              </Grid>

              <Grid
                item
                sm={12}
                sx={{ display: "flex", justifyContent: "flex-end" }}
              >
                <Button onClick={handleClose} variant="text" sx={{ mr: 1.2 }}>
                  Cancel
                </Button>
                <LoadingButton
                  type="submit"
                  variant="contained"
                  loading={props.isSubmitting}
                >
                  Export
                </LoadingButton>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Box>
  );
}
