import React from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormControl,
  FormLabel,
  FormHelperText,
  Box,
  Typography,
  Chip,
} from '@mui/material';
import { Formik, Form } from 'formik';
import * as yup from 'yup';

export default function StockModal({ open, onClose, product, onSubmit }) {
  const currentStock = product ? product.quantity : 0;
  const minStock = product ? product.minStock : 5;

  const getStockStatusTheme = (qty, min) => {
    if (qty === 0) {
      return {
        bg: (theme) => theme.palette.mode === 'light' ? 'rgba(211, 47, 47, 0.04)' : 'rgba(239, 68, 68, 0.08)',
        borderColor: 'error.light',
        color: 'error.main',
        label: 'Out of Stock',
      };
    }
    if (qty <= min) {
      return {
        bg: (theme) => theme.palette.mode === 'light' ? 'rgba(237, 108, 2, 0.04)' : 'rgba(245, 158, 11, 0.08)',
        borderColor: 'warning.light',
        color: 'warning.main',
        label: 'Low Stock Alert',
      };
    }
    return {
      bg: (theme) => theme.palette.mode === 'light' ? 'rgba(46, 125, 50, 0.04)' : 'rgba(16, 185, 129, 0.08)',
      borderColor: 'success.light',
      color: 'success.main',
      label: 'Healthy Stock',
    };
  };

  const statusTheme = getStockStatusTheme(currentStock, minStock);

  const validationSchema = yup.object().shape({
    type: yup.string().oneOf(['restock', 'sale']).required('Please select an adjustment type'),
    quantity: yup.number()
      .typeError('Quantity must be a valid number')
      .integer('Quantity must be a whole number')
      .positive('Quantity must be greater than 0')
      .required('Quantity is required')
      .test(
        'max-decrease',
        `Sale quantity cannot exceed current stock (${currentStock})`,
        function (value) {
          const { type } = this.parent;
          if (type === 'sale') {
            return value <= currentStock;
          }
          return true;
        }
      ),
  });

  const handleFormSubmit = (values, { setSubmitting, resetForm }) => {
    onSubmit(values);
    setSubmitting(false);
    resetForm();
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 3, p: 1 },
      }}
    >
      <DialogTitle sx={{ fontWeight: 700, pb: 1 }}>Adjust Stock Level</DialogTitle>
      {product && (
        <Formik
          initialValues={{ type: 'restock', quantity: '' }}
          validationSchema={validationSchema}
          onSubmit={handleFormSubmit}
        >
          {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
            <Form noValidate>
              <DialogContent sx={{ py: 1 }}>
                <DialogContentText variant="body2" sx={{ mb: 3 }}>
                  Adjust inventory levels for <strong>{product.name}</strong>.
                </DialogContentText>

                <Box
                  sx={{
                    p: 2.5,
                    mb: 3,
                    borderRadius: 3,
                    bgcolor: statusTheme.bg,
                    border: '1px dashed',
                    borderColor: statusTheme.borderColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Box>
                    <Typography
                      variant="caption"
                      sx={{
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        color: 'text.secondary',
                        letterSpacing: '0.05em',
                        display: 'block',
                        mb: 0.5,
                      }}
                    >
                      Current Stock Status
                    </Typography>
                    <Chip
                      label={statusTheme.label}
                      color={currentStock === 0 ? 'error' : currentStock <= minStock ? 'warning' : 'success'}
                      size="small"
                      sx={{
                        fontWeight: 700,
                        fontSize: '0.75rem',
                        height: 20,
                      }}
                    />
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.5 }}>
                    <Typography
                      variant="h3"
                      sx={{
                        fontWeight: 800,
                        color: statusTheme.color,
                        lineHeight: 1,
                      }}
                    >
                      {currentStock}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 600,
                        color: 'text.secondary',
                      }}
                    >
                      units
                    </Typography>
                  </Box>
                </Box>

                <FormControl error={touched.type && Boolean(errors.type)} component="fieldset" sx={{ mb: 3, display: 'flex' }}>
                  <FormLabel component="legend" sx={{ fontWeight: 700, fontSize: '0.85rem', mb: 1, textTransform: 'uppercase', color: 'text.secondary' }}>
                    Adjustment Type
                  </FormLabel>
                  <RadioGroup
                    name="type"
                    value={values.type}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    row
                    sx={{ gap: 2 }}
                  >
                    <FormControlLabel
                      value="restock"
                      control={<Radio color="primary" />}
                      label={
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          Restock (increase)
                        </Typography>
                      }
                    />
                    <FormControlLabel
                      value="sale"
                      control={<Radio color="secondary" />}
                      label={
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          Sale (decrease)
                        </Typography>
                      }
                    />
                  </RadioGroup>
                  {touched.type && errors.type && (
                    <FormHelperText>{errors.type}</FormHelperText>
                  )}
                </FormControl>

                <TextField
                  fullWidth
                  name="quantity"
                  label="Quantity"
                  type="number"
                  placeholder="e.g. 10"
                  value={values.quantity}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.quantity && Boolean(errors.quantity)}
                  helperText={touched.quantity && errors.quantity}
                  slotProps={{ htmlInput: { min: 1, step: 1 } }}
                  sx={{ mb: 1 }}
                />
              </DialogContent>
              <DialogActions sx={{ px: 3, pb: 2, gap: 1.5 }}>
                <Button
                  onClick={onClose}
                  color="inherit"
                  variant="outlined"
                  disabled={isSubmitting}
                  sx={{ borderRadius: 2, px: 3, fontWeight: 600 }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  disabled={isSubmitting}
                  sx={{ borderRadius: 2, px: 3, fontWeight: 600 }}
                >
                  Apply
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      )}
    </Dialog>
  );
}

StockModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  product: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
};
