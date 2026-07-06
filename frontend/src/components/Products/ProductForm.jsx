import React, { useMemo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import { Box, Button, Grid, Typography, Paper, Alert, List, ListItemButton, ListItemText } from '@mui/material';
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
  const { categories, products } = useInventory();
  const isEdit = Boolean(product);
  const [nameInput, setNameInput] = useState(product?.name || '');
  const [showSuggestions, setShowSuggestions] = useState(false);

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

  useEffect(() => {
    setNameInput(product?.name || '');
  }, [product]);

  const existingProductsByName = useMemo(() => {
    const map = new Map();
    products.forEach((item) => {
      if (item?.name) {
        const normalizedName = item.name.trim().toLowerCase();
        if (!map.has(normalizedName)) {
          map.set(normalizedName, item);
        }
      }
    });
    return map;
  }, [products]);

  const existingProductNames = useMemo(() => {
    return Array.from(existingProductsByName.keys()).map((key) => {
      const productMatch = existingProductsByName.get(key);
      return productMatch?.name?.trim() || key;
    });
  }, [existingProductsByName]);

  const filteredSuggestions = useMemo(() => {
    const trimmed = nameInput.trim().toLowerCase();
    if (trimmed.length < 3) {
      return [];
    }

    return existingProductNames.filter((item) => item.toLowerCase().includes(trimmed)).slice(0, 5);
  }, [existingProductNames, nameInput]);

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
        {({ isSubmitting, values, setFieldValue }) => {
          const trimmedName = (values.name || '').trim().toLowerCase();
          const matchedExistingProduct = trimmedName.length >= 3
            ? existingProductsByName.get(trimmedName) || Array.from(existingProductsByName.values()).find((item) =>
                item?.name?.trim().toLowerCase().includes(trimmedName)
              ) || null
            : null;
          const submitLabel = isEdit ? 'Save Changes' : matchedExistingProduct ? 'Update' : 'Add Product';

          return (
          <Form noValidate>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Box sx={{ position: 'relative' }}>
                  <FormField
                    name="name"
                    label="Product Name"
                    placeholder="e.g. Wireless Mouse"
                    required
                    value={values.name}
                    onChange={(event) => {
                      const nextValue = event.target.value;
                      setNameInput(nextValue);
                      setShowSuggestions(true);
                      setFieldValue('name', nextValue);
                    }}
                    onFocus={() => setShowSuggestions(true)}
                    onBlur={() => window.setTimeout(() => setShowSuggestions(false), 120)}
                  />
                  {showSuggestions && filteredSuggestions.length > 0 && (
                    <Paper
                      elevation={3}
                      sx={{
                        position: 'absolute',
                        zIndex: 3,
                        width: '100%',
                        mt: 0.5,
                        borderRadius: 2,
                        overflow: 'hidden',
                      }}
                    >
                      <List dense sx={{ py: 0 }}>
                        {filteredSuggestions.map((suggestion) => (
                          <ListItemButton
                            key={suggestion}
                            onMouseDown={(event) => event.preventDefault()}
                            onClick={() => {
                              const matchedProduct = existingProductsByName.get(suggestion.trim().toLowerCase());
                              setNameInput(suggestion);
                              setFieldValue('name', suggestion, true);
                              setFieldValue('category', matchedProduct?.category || '', true);
                              setFieldValue('price', matchedProduct?.price ?? '', true);
                              setFieldValue('quantity', matchedProduct?.quantity ?? '', true);
                              setFieldValue('minStock', matchedProduct?.minStock ?? 5, true);
                              setFieldValue('sku', matchedProduct?.sku || stableSku, true);
                              setShowSuggestions(false);
                            }}
                          >
                            <ListItemText primary={suggestion} />
                          </ListItemButton>
                        ))}
                      </List>
                    </Paper>
                  )}
                </Box>
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
                    {submitLabel}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Form>
          );
        }}
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
