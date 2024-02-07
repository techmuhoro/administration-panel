import { Field, ErrorMessage, getIn } from "formik";
import PropTypes from "prop-types";

import { TextField, MenuItem } from "@mui/material";

const FormikCustomInput = ({
  type,
  label,
  variant,
  name,
  multiline,
  required,
  error,
  helperText,
  select,
  selectItem,
  onChange,
  onBlur,
  shrink,
  disabled,
  autoFocus,
  ...restProps
}) => {
  return (
    <Field name={name}>
      {({ field, form }) => {
        return (
          <TextField
            {...field}
            id={label}
            variant={variant}
            type="text"
            name={name}
            onChange={onChange !== null ? onChange : form.handleChange}
            onBlur={onBlur !== null ? onBlur : form.handleBlur}
            required={required}
            helperText={<ErrorMessage name={name} />}
            error={Boolean(
              getIn(form.touched, name) && getIn(form.errors, name)
            )}
            placeholder={label}
            size="medium"
            fullWidth
            multiline={multiline}
            select={select}
            {...restProps}
          >
            {select &&
              selectItem.map((option) => (
                <MenuItem key={option.key} value={option.value}>
                  {option.key}
                </MenuItem>
              ))}
          </TextField>
        );
      }}
    </Field>
  );
};

FormikCustomInput.defaultProps = {
  label: "",
  multiline: false,
  variant: "outlined",
  required: false,
  error: false,
  helperText: "",
  select: false,
  selectItem: [],
  onChange: null,
  onBlur: null,
  shrink: false,
  type: "text",
  disabled: false,
};

FormikCustomInput.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  name: PropTypes.string.isRequired,
  multiline: PropTypes.bool,
  variant: PropTypes.string,
  required: PropTypes.bool,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  select: PropTypes.bool,
  selectItem: PropTypes.arrayOf(PropTypes.shape({})),
  shrink: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default FormikCustomInput;
