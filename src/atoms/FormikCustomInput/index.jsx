import { useState } from "react";

import { Field, ErrorMessage, getIn } from "formik";

import { TextField, InputAdornment, MenuItem, IconButton } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const FormikCustomInput = ({
  name,
  type,
  select,
  icon,
  selectItem,
  placeholder,
  ...rest
}) => {
  const [visibility, setVisibility] = useState(false);

  const typeChangeHandler = () => {
    setVisibility((prev) => !prev);
  };
  return (
    <Field name={name}>
      {({ field, form }) => (
        <TextField
          {...field}
          select={select}
          fullWidth
          name={name}
          size="small"
          placeholder={placeholder}
          type={type !== "password" ? type : visibility ? "text" : "password"}
          helperText={<ErrorMessage name={name} />}
          error={Boolean(getIn(form.touched, name) && getIn(form.errors, name))}
          InputProps={{
            endAdornment: type === "password" && (
              <InputAdornment>
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={typeChangeHandler}
                >
                  {visibility ? (
                    <Visibility sx={{ fontSize: 18 }} />
                  ) : (
                    <VisibilityOff sx={{ fontSize: 18 }} />
                  )}
                </IconButton>{" "}
              </InputAdornment>
            ),
            sx: {
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#DADEF0", // change the border color here
              },

              input: {
                "&::placeholder": {
                  color: "#00000",
                  fontSize: 13,
                },
              },
            },
          }}
          {...rest}
        >
          {select &&
            selectItem.map((option) => (
              <MenuItem key={option.key} value={option.value}>
                {option.key}
              </MenuItem>
            ))}
        </TextField>
      )}
    </Field>
  );
};

export default FormikCustomInput;
