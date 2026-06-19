import React from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from '@mui/material';
import { Formik, Form } from 'formik';
import { createCategorySchema } from '../../utils/validation';
import { useInventory } from '../../context/InventoryContext';

export default function CategoryFormDialog({ open, onClose, onSubmit }) {
  const { categories } = useInventory();
  const existingNames = categories.map((c) => c.name);
  const validationSchema = createCategorySchema(existingNames);

  const handleFormSubmit = (values, { setSubmitting, resetForm }) => {
    onSubmit({ name: values.name.trim() });
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
      <DialogTitle sx={{ fontWeight: 700, pb: 1 }}>Add New Category</DialogTitle>
      <Formik
        initialValues={{ name: '' }}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
      >
        {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
          <Form noValidate>
            <DialogContent sx={{ py: 1 }}>
              <TextField
                fullWidth
                name="name"
                label="Category Name"
                placeholder="e.g. Clothing, Office Supplies"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
                autoFocus
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
                Create
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
}

CategoryFormDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
