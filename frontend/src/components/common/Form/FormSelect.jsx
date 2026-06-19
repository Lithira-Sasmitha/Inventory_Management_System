import React from 'react';
import PropTypes from 'prop-types';
import { TextField, MenuItem } from '@mui/material';
import { useField } from 'formik';

export default function FormSelect({ name, label, options = [], ...props }) {
  const [field, meta] = useField(name);

  const errorText = meta.touched && meta.error ? meta.error : '';

  return (
    <TextField
      {...field}
      {...props}
      select
      label={label}
      error={Boolean(errorText)}
      helperText={errorText}
      fullWidth
      variant="outlined"
      slotProps={{
        htmlInput: {
          'aria-invalid': Boolean(errorText),
          'aria-describedby': errorText ? `${name}-error-text` : undefined,
        },
      }}
      FormHelperTextProps={{
        id: `${name}-error-text`,
        sx: {
          mx: 0.5,
          mt: 0.75,
          fontWeight: 500,
        },
      }}
      sx={{
        mb: 2.5,
        '& .MuiOutlinedInput-root': {
          borderRadius: 2,
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
          },
          '&.Mui-focused': {
            boxShadow: '0 4px 12px rgba(79, 70, 229, 0.15)',
          },
        },
        ...props.sx,
      }}
    >
      {options.length === 0 ? (
        <MenuItem value="" disabled>
          No options available
        </MenuItem>
      ) : (
        options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))
      )}
    </TextField>
  );
}

FormSelect.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  sx: PropTypes.object,
};
