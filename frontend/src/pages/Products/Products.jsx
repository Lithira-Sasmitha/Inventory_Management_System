import React, { useState, useMemo, useCallback } from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions,
  MenuItem,
  TextField,
} from '@mui/material';
import {
  Add as AddIcon,
  Download as ExportIcon,
} from '@mui/icons-material';
import { Formik, Form } from 'formik';

import EntityPage from '../../components/common/EntityPage/EntityPage';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import useSearch from '../../hooks/useSearch';
import { useInventory } from '../../context/InventoryContext';
import ProductForm from '../../components/Products/ProductForm';
import ProductList from '../../components/Products/ProductList';
import exportProductsToCSV from '../../utils/csvExport';
import { stockAdjustmentSchema } from '../../utils/validation';

export default function Products() {
  const { products, addProduct, updateProduct, deleteProduct, adjustStock } = useInventory();
  const { searchQuery, handleSearchChange } = useSearch();

  const [formOpen, setFormOpen] = useState(false);
  const [adjustOpen, setAdjustOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filteredProducts = useMemo(() => {
    if (!searchQuery) return products;
    const query = searchQuery.toLowerCase().trim();
    return products.filter(
      (p) =>
        p.name?.toLowerCase().includes(query) ||
        p.sku?.toLowerCase().includes(query)
    );
  }, [products, searchQuery]);

  const handleOpenAddForm = useCallback(() => {
    setSelectedProduct(null);
    setFormOpen(true);
  }, []);

  const handleOpenEditForm = useCallback((product) => {
    setSelectedProduct(product);
    setFormOpen(true);
  }, []);

  const handleFormClose = useCallback(() => {
    setFormOpen(false);
    setSelectedProduct(null);
  }, []);

  const handleFormSubmit = useCallback(
    (values) => {
      if (selectedProduct) {
        updateProduct(selectedProduct.id, values);
      } else {
        addProduct(values);
      }
      handleFormClose();
    },
    [selectedProduct, addProduct, updateProduct, handleFormClose]
  );

  const handleOpenAdjust = useCallback((product) => {
    setSelectedProduct(product);
    setAdjustOpen(true);
  }, []);

  const handleAdjustClose = useCallback(() => {
    setAdjustOpen(false);
    setSelectedProduct(null);
  }, []);

  const handleAdjustSubmit = useCallback(
    (values, { setSubmitting }) => {
      if (!selectedProduct) return;
      const qty = Number(values.quantity);
      const amount = values.type === 'add' ? qty : -qty;
      adjustStock(selectedProduct.id, amount, values.reason || 'Manual adjustment');
      setSubmitting(false);
      handleAdjustClose();
    },
    [selectedProduct, adjustStock, handleAdjustClose]
  );

  const handleOpenDelete = useCallback((product) => {
    setSelectedProduct(product);
    setDeleteOpen(true);
  }, []);

  const handleDeleteClose = useCallback(() => {
    setDeleteOpen(false);
    setSelectedProduct(null);
  }, []);

  const handleDeleteConfirm = useCallback(() => {
    if (selectedProduct) {
      deleteProduct(selectedProduct.id);
    }
    handleDeleteClose();
  }, [selectedProduct, deleteProduct, handleDeleteClose]);

  const handleExportCSV = useCallback(() => {
    exportProductsToCSV(products, 'inventory_products.csv');
  }, [products]);

  return (
    <>
      <EntityPage
        title="Products Inventory"
        description="Manage inventory items, SKU codes, pricing, stock quantities, and tracking thresholds."
        searchPlaceholder="Search products by name or SKU..."
        searchValue={searchQuery}
        onSearchChange={handleSearchChange}
        actionLabel="Add Product"
        actionIcon={<AddIcon />}
        onActionClick={handleOpenAddForm}
        isEmpty={products.length === 0}
        emptyText="No products found. Click 'Add Product' above to create your first inventory item."
      >
        <ProductList
          products={filteredProducts}
          onEdit={handleOpenEditForm}
          onDelete={handleOpenDelete}
          onAdjustStock={handleOpenAdjust}
          extraHeaderActions={
            <Button
              variant="outlined"
              color="inherit"
              startIcon={<ExportIcon />}
              onClick={handleExportCSV}
              disabled={products.length === 0}
              sx={{
                borderRadius: 2,
                borderColor: 'divider',
                color: 'text.secondary',
                fontWeight: 600,
                textTransform: 'none',
                height: 36,
                '&:hover': {
                  borderColor: 'text.primary',
                  bgcolor: 'action.hover',
                },
              }}
            >
              Export CSV
            </Button>
          }
        />
      </EntityPage>

      <Dialog
        open={formOpen}
        onClose={handleFormClose}
        maxWidth="md"
        fullWidth
        scroll="body"
        PaperProps={{
          sx: { borderRadius: 4, bgcolor: 'background.paper', p: 0 },
        }}
      >
        <DialogContent sx={{ p: 0 }}>
          <ProductForm
            product={selectedProduct}
            onSubmit={handleFormSubmit}
            onCancel={handleFormClose}
          />
        </DialogContent>
      </Dialog>

      <Dialog
        open={adjustOpen}
        onClose={handleAdjustClose}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 3, p: 1 },
        }}
      >
        <DialogTitle sx={{ fontWeight: 700, pb: 1 }}>Adjust Stock Level</DialogTitle>
        <Formik
          initialValues={{ type: 'add', quantity: '', reason: '' }}
          validationSchema={stockAdjustmentSchema}
          onSubmit={handleAdjustSubmit}
        >
          {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
            <Form noValidate>
              <DialogContent sx={{ py: 1 }}>
                <DialogContentText variant="body2" sx={{ mb: 3 }}>
                  Adjust inventory levels for{' '}
                  <strong>{selectedProduct?.name}</strong> (Current Stock:{' '}
                  {selectedProduct?.quantity}).
                </DialogContentText>

                <TextField
                  select
                  fullWidth
                  name="type"
                  label="Adjustment Type"
                  value={values.type}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  sx={{ mb: 2.5 }}
                >
                  <MenuItem value="add">Add Stock (Receive / Restock)</MenuItem>
                  <MenuItem value="remove">Remove Stock (Shipment / Damage)</MenuItem>
                </TextField>

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
                  sx={{ mb: 2.5 }}
                />

                <TextField
                  fullWidth
                  name="reason"
                  label="Reason / Comments"
                  placeholder="e.g. Damage report, supplier batch #12"
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
                  onClick={handleAdjustClose}
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
                  Apply
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>

      <ConfirmDialog
        open={deleteOpen}
        onClose={handleDeleteClose}
        onConfirm={handleDeleteConfirm}
        title="Delete Product"
        message={
          <>
            Are you sure you want to delete <strong>{selectedProduct?.name}</strong>?
            This will permanently remove the item from the system and cannot be undone.
          </>
        }
        confirmLabel="Delete"
        confirmColor="error"
      />
    </>
  );
}
