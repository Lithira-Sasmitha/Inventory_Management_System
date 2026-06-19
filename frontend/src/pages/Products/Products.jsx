import React, { useState, useMemo, useCallback } from 'react';
import {
  Button,
  Dialog,
  DialogContent,
} from '@mui/material';
import {
  Add as AddIcon,
  Download as ExportIcon,
} from '@mui/icons-material';

import EntityPage from '../../components/common/EntityPage/EntityPage';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import useSearch from '../../hooks/useSearch';
import { useInventory } from '../../context/InventoryContext';
import ProductForm from '../../components/Products/ProductForm';
import ProductList from '../../components/Products/ProductList';
import StockModal from '../../components/Products/StockModal';
import exportProductsToCSV from '../../utils/csvExport';

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
    (values) => {
      if (!selectedProduct) return;
      const qty = Number(values.quantity);
      const amount = values.type === 'restock' ? qty : -qty;
      adjustStock(selectedProduct.id, amount, values.reason || 'Manual adjustment');
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

      <StockModal
        open={adjustOpen}
        onClose={handleAdjustClose}
        product={selectedProduct}
        onSubmit={handleAdjustSubmit}
      />

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
