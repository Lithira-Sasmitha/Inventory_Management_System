import React, { useState, useMemo, useCallback } from 'react';
import {
  Dialog,
  DialogContent,
} from '@mui/material';
import {
  Add as AddIcon,
} from '@mui/icons-material';

import EntityPage from '../../components/common/EntityPage/EntityPage';
import DeleteConfirm from '../../components/Products/DeleteConfirm';
import useSearch from '../../hooks/useSearch';
import { useInventory } from '../../context/InventoryContext';
import ProductForm from '../../components/Products/ProductForm';
import ProductList from '../../components/Products/ProductList';
import StockModal from '../../components/Products/StockModal';
import exportProductsToCSV from '../../utils/csvExport';
import ProductFilterToolbar from '../../components/Products/ProductFilterToolbar';

export default function Products() {
  const { products, categories, addProduct, updateProduct, deleteProduct, adjustStock } = useInventory();
  const { searchQuery, handleSearchChange } = useSearch();

  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStockStatus, setSelectedStockStatus] = useState('');
  const [viewMode, setViewMode] = useState(
    () => localStorage.getItem('product_view_mode') || 'table'
  );
  const [formOpen, setFormOpen] = useState(false);

  const handleViewModeChange = useCallback((event, nextView) => {
    if (nextView !== null) {
      setViewMode(nextView);
      localStorage.setItem('product_view_mode', nextView);
    }
  }, []);
  const [adjustOpen, setAdjustOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filteredProducts = useMemo(() => {
    let result = products;

    if (searchQuery) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name?.toLowerCase().includes(query) ||
          p.sku?.toLowerCase().includes(query)
      );
    }

    if (selectedCategory) {
      result = result.filter(
        (p) => p.category?.toLowerCase().trim() === selectedCategory.toLowerCase().trim()
      );
    }

    if (selectedStockStatus) {
      if (selectedStockStatus === 'in_stock') {
        result = result.filter((p) => p.quantity > 0);
      } else if (selectedStockStatus === 'out_of_stock') {
        result = result.filter((p) => p.quantity === 0);
      }
    }

    return result;
  }, [products, searchQuery, selectedCategory, selectedStockStatus]);

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
        actionLabel="Add Product"
        actionIcon={<AddIcon />}
        onActionClick={handleOpenAddForm}
        isEmpty={products.length === 0}
        emptyText="No products found. Click 'Add Product' above to create your first inventory item."
      >
        <ProductFilterToolbar
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedStockStatus={selectedStockStatus}
          onStockStatusChange={setSelectedStockStatus}
          categories={categories}
          totalProductsCount={products.length}
          filteredProductsCount={filteredProducts.length}
          viewMode={viewMode}
          onViewModeChange={handleViewModeChange}
          onExportCSV={handleExportCSV}
          productsCount={products.length}
        />
        <ProductList
          products={filteredProducts}
          viewMode={viewMode}
          onEdit={handleOpenEditForm}
          onDelete={handleOpenDelete}
          onAdjustStock={handleOpenAdjust}
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

      <DeleteConfirm
        open={deleteOpen}
        onClose={handleDeleteClose}
        onConfirm={handleDeleteConfirm}
        productName={selectedProduct?.name || ''}
      />
    </>
  );
}
