import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import { Box, Button, Grid, Typography, Paper, Alert } from '@mui/material';
import { productSchema } from '../../utils/validation';
import { useInventory } from '../../context/InventoryContext';
import FormField from '../common/Form/FormField';
import FormSelect from '../common/Form/FormSelect';

const generateSKU = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let randomStr = '';
  for (let i = 0; i < 6; i++) {
    randomStr += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `SKU-${randomStr}`;
};

export default function ProductForm({ product = null, onSubmit, onCancel }) {
  const { categories } = useInventory();
  const isEdit = Boolean(product);

  const stableSku = useMemo(() => {
    if (isEdit && product?.sku) {
      return product.sku;
    }
    return generateSKU();
  }, [isEdit, product]);

  const initialValues = useMemo(() => {
    return {
      name: product?.name || '',
      category: product?.category || '',
      price: product?.price || '',
      quantity: product?.quantity !== undefined ? product.quantity : '',
      minStock: product?.minStock !== undefined ? product.minStock : 5,
      sku: stableSku,
    };
  }, [product, stableSku]);

  const categoryOptions = useMemo(() => {
    return categories.map((cat) => ({
      value: cat.name,
      label: cat.name,
    }));
  }, [categories]);

  const handleSubmit = (values, { setSubmitting }) => {
    const formattedValues = {
      ...values,
      price: Number(values.price),
      quantity: Number(values.quantity),
      minStock: Number(values.minStock),
    };
    
    onSubmit(formattedValues);
    setSubmitting(false);
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 3, sm: 4 },
        borderRadius: 4,
        border: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.paper',
      }}
    >
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: 'text.primary' }}>
          {isEdit ? 'Edit Product Details' : 'Create New Product'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {isEdit 
            ? 'Modify existing product specifications, pricing, and stock levels.' 
            : 'Fill in the details to add a new item to your inventory system.'
          }
        </Typography>
      </Box>

      {categoryOptions.length === 0 && (
        <Alert severity="warning" sx={{ mb: 3, borderRadius: 2 }}>
          No categories found. Please create a category first so that you can select it when creating a product.
        </Alert>
      )}

      <Formik
        initialValues={initialValues}
        validationSchema={productSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ isSubmitting }) => (
          <Form noValidate>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <FormField
                  name="name"
                  label="Product Name"
                  placeholder="e.g. Wireless Mouse"
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormSelect
                  name="category"
                  label="Category"
                  options={categoryOptions}
                  required
                  disabled={categoryOptions.length === 0}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormField
                  name="price"
                  label="Price ($)"
                  type="number"
                  placeholder="0.00"
                  slotProps={{
                    htmlInput: { min: 0.01, step: 0.01 }
                  }}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormField
                  name="quantity"
                  label="Stock Quantity"
                  type="number"
                  placeholder="0"
                  slotProps={{
                    htmlInput: { min: 0, step: 1 }
                  }}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormField
                  name="sku"
                  label="Product SKU (Auto-generated)"
                  slotProps={{
                    input: { readOnly: true },
                  }}
                  helperText="Unique SKU identifier is automatically generated and read-only"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormField
                  name="minStock"
                  label="Min Stock Alert Level"
                  type="number"
                  placeholder="5"
                  slotProps={{
                    htmlInput: { min: 0, step: 1 }
                  }}
                  helperText="System will trigger warnings if stock drops below this number"
                />
              </Grid>

              <Grid item xs={12}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    gap: 2,
                    mt: 2,
                    pt: 2,
                    borderTop: '1px solid',
                    borderColor: 'divider',
                  }}
                >
                  <Button
                    variant="outlined"
                    color="inherit"
                    onClick={onCancel}
                    disabled={isSubmitting}
                    sx={{
                      px: 3,
                      py: 1.25,
                      borderRadius: 2,
                      fontWeight: 600,
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                    sx={{
                      px: 4,
                      py: 1.25,
                      borderRadius: 2,
                      fontWeight: 600,
                      boxShadow: '0 4px 12px rgba(79, 70, 229, 0.2)',
                      '&:hover': {
                        boxShadow: '0 6px 16px rgba(79, 70, 229, 0.3)',
                      },
                    }}
                  >
                    {isEdit ? 'Save Changes' : 'Add Product'}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Paper>
  );
}

ProductForm.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    category: PropTypes.string,
    sku: PropTypes.string,
    price: PropTypes.number,
    quantity: PropTypes.number,
    minStock: PropTypes.number,
  }),
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
