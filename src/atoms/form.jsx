"use client";

import { useField } from "formik";
import TextField from "@mui/material/TextField";
import { MenuItem } from "@mui/material";
import MuiCheckbox from "@mui/material/Checkbox";
import MuiRadio from "@mui/material/Radio";
import MuiRadioGroup from "@mui/material/RadioGroup";
import MuiSelect from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import { Field } from "formik";

function Input({ label, ...props }) {
  const [field, meta] = useField(props);
  return (
    <Box>
      <TextField fullWidth {...field} {...props} size="small" label={label} />
      {meta.touched && meta.error && (
        <Typography variant="body2" style={{ color: "red" }}>
          {meta.error}
        </Typography>
      )}
    </Box>
  );
}

function Checkbox({ label, ...props }) {
  const [field, meta] = useField(props);
  return (
    <Box>
      <FormControlLabel
        control={<MuiCheckbox {...field} {...props} />}
        label={label}
      />

      {meta.touched && meta.error && (
        <Typography variant="body2" style={{ color: "red" }}>
          {meta.error}
        </Typography>
      )}
    </Box>
  );
}

function RadioGroup({ label, ...props }) {
  const [field, meta] = useField(props);

  return (
    <FormControl>
      <FormLabel id={props.name}>{label}</FormLabel>
      <MuiRadioGroup aria-labelledby={props.name} {...field} {...props} />

      {meta.error && (
        <Typography variant="body2" style={{ color: "red" }}>
          {meta.error}
        </Typography>
      )}
    </FormControl>
  );
}

/**
 *
 * Used in the context of Radio group //NB must be wrapped inside radio group to work properly
 */
function Radio({ label, ...props }) {
  return (
    <Box>
      <FormControlLabel {...props} control={<MuiRadio />} label={label} />
    </Box>
  );
}

/**
 * For use outside radio group
 */
function SingleRadio() {}

function Select({ label, ...props }) {
  const [field, meta] = useField(props);

  return (
    <FormControl size="small" fullWidth>
      <InputLabel id={props.id}>{label}</InputLabel>

      <MuiSelect
        labelId={props.id}
        {...field}
        {...props}
        size="small"
        label={label}
        sx={{ width: "100%" }}
      />

      {meta.error && (
        <Typography variant="body2" style={{ color: "red" }}>
          {meta.error}
        </Typography>
      )}
    </FormControl>
  );
}
function ReusableDropdown({ label, name, options, ...rest }) {
  return (
    <Field
      as={TextField}
      select
      label={label}
      name={name}
      variant="outlined"
      fullWidth
      margin="normal"
      {...rest}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Field>
  );
}

export { Input, Checkbox, Select, RadioGroup, Radio, ReusableDropdown };
