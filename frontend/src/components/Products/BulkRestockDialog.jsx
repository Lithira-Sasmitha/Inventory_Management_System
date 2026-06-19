import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';
import { Formik, Form } from 'formik';
import { bulkRestockSchema } from '../../utils/validation';

export default function BulkRestockDialog({ open, onClose, selectedCount, onSubmit }) {
  const handleFormSubmit = (values, { setSubmitting, resetForm }) => {
    onSubmit(Number(values.quantity), values.reason || 'Bulk restock adjustment');
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
      <DialogTitle sx={{ fontWeight: 700, pb: 1 }}>Bulk Restock Products</DialogTitle>
      <Formik
        initialValues={{ quantity: '', reason: '' }}
        validationSchema={bulkRestockSchema}
        onSubmit={handleFormSubmit}
      >
        {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
          <Form noValidate>
            <DialogContent sx={{ py: 1 }}>
              <DialogContentText variant="body2" sx={{ mb: 3 }}>
                You are restocking <strong>{selectedCount}</strong> selected product
                {selectedCount === 1 ? '' : 's'}.
                Enter the quantity to add to the stock of each item:
              </DialogContentText>

              <TextField
                fullWidth
                name="quantity"
                label="Quantity to Add"
                type="number"
                placeholder="e.g. 50"
                value={values.quantity}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.quantity && Boolean(errors.quantity)}
                helperText={touched.quantity && errors.quantity}
                slotProps={{
                  htmlInput: { min: 1, step: 1 },
                }}
                sx={{ mb: 2.5 }}
              />

              <TextField
                fullWidth
                name="reason"
                label="Reason / Comments"
                placeholder="e.g. Monthly replenishment batch"
                multiline
                rows={2}
                value={values.reason}
                onChange={handleChange}
                onBlur={handleBlur}
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
                color="secondary"
                variant="contained"
                disabled={isSubmitting}
                sx={{ borderRadius: 2, px: 3, fontWeight: 600 }}
              >
                Apply Restock
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
}

BulkRestockDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  selectedCount: PropTypes.number.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
