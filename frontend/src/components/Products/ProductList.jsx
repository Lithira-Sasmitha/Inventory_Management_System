import React, { useState, useEffect, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Grid,
  TablePagination,
  Typography,
} from '@mui/material';
import { useInventory } from '../../context/InventoryContext';
import ProductTable from './ProductTable';
import ProductCard from './ProductCard';
import BulkActionsToolbar from './BulkActionsToolbar';
import BulkRestockDialog from './BulkRestockDialog';
import ConfirmDialog from '../common/ConfirmDialog';

export default function ProductList({
  products = [],
  viewMode,
  onEdit,
  onDelete,
  onAdjustStock,
}) {
  const { deleteProducts, bulkAdjustStock } = useInventory();

  const [selectedIds, setSelectedIds] = useState([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [bulkRestockOpen, setBulkRestockOpen] = useState(false);
  const [bulkDeleteOpen, setBulkDeleteOpen] = useState(false);

  useEffect(() => {
    setSelectedIds((prev) => prev.filter((id) => products.some((p) => p.id === id)));
  }, [products]);

  const totalPages = Math.ceil(products.length / rowsPerPage);
  useEffect(() => {
    if (page >= totalPages && totalPages > 0) {
      setPage(totalPages - 1);
    }
  }, [products.length, rowsPerPage, page, totalPages]);

  const paginatedProducts = useMemo(
    () => products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [products, page, rowsPerPage]
  );

  const paginatedIds = useMemo(
    () => paginatedProducts.map((p) => p.id),
    [paginatedProducts]
  );

  const isAllPageSelected =
    paginatedIds.length > 0 && paginatedIds.every((id) => selectedIds.includes(id));
  const isSomePageSelected =
    paginatedIds.some((id) => selectedIds.includes(id)) && !isAllPageSelected;


  const handleChangePage = useCallback((event, newPage) => {
    setPage(newPage);
  }, []);

  const handleChangeRowsPerPage = useCallback((event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }, []);

  const handleSelectAllPage = useCallback(
    (event) => {
      if (event.target.checked) {
        setSelectedIds((prev) => {
          const combined = new Set([...prev, ...paginatedIds]);
          return Array.from(combined);
        });
      } else {
        setSelectedIds((prev) => prev.filter((id) => !paginatedIds.includes(id)));
      }
    },
    [paginatedIds]
  );

  const handleSelectOne = useCallback((id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  }, []);

  const handleBulkRestock = useCallback(
    (quantity, reason) => {
      bulkAdjustStock(selectedIds, quantity, reason);
      setSelectedIds([]);
    },
    [selectedIds, bulkAdjustStock]
  );

  const handleBulkDeleteConfirm = useCallback(() => {
    deleteProducts(selectedIds);
    setSelectedIds([]);
    setBulkDeleteOpen(false);
  }, [selectedIds, deleteProducts]);

  return (
    <Box>
      {selectedIds.length > 0 && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 3,
            flexWrap: 'wrap',
            gap: 2,
            minHeight: 48,
          }}
        >
          <BulkActionsToolbar
            selectedCount={selectedIds.length}
            isAllPageSelected={isAllPageSelected}
            isSomePageSelected={isSomePageSelected}
            onSelectAll={handleSelectAllPage}
            onRestockClick={() => setBulkRestockOpen(true)}
            onDeleteClick={() => setBulkDeleteOpen(true)}
          />
        </Box>
      )}

      {products.length === 0 ? (
        <Box
          sx={{
            py: 8,
            textAlign: 'center',
            border: '2px dashed',
            borderColor: 'divider',
            borderRadius: 4,
            bgcolor: 'background.default',
          }}
        >
          <Typography variant="body1" color="text.secondary" sx={{ fontStyle: 'italic' }}>
            No products found matching your search.
          </Typography>
        </Box>
      ) : viewMode === 'table' ? (
        <ProductTable
          products={paginatedProducts}
          selectedIds={selectedIds}
          isAllPageSelected={isAllPageSelected}
          isSomePageSelected={isSomePageSelected}
          onSelectAll={handleSelectAllPage}
          onSelectOne={handleSelectOne}
          onEdit={onEdit}
          onDelete={onDelete}
          onAdjustStock={onAdjustStock}
        />
      ) : (
        <Grid container spacing={3}>
          {paginatedProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <ProductCard
                product={product}
                isSelected={selectedIds.includes(product.id)}
                onSelect={handleSelectOne}
                onEdit={onEdit}
                onDelete={onDelete}
                onAdjustStock={onAdjustStock}
              />
            </Grid>
          ))}
        </Grid>
      )}

      {products.length > 0 && (
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={products.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            mt: 3,
            borderTop: '1px solid',
            borderColor: 'divider',
            '.MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows': {
              fontWeight: 500,
            },
          }}
        />
      )}

      <BulkRestockDialog
        open={bulkRestockOpen}
        onClose={() => setBulkRestockOpen(false)}
        selectedCount={selectedIds.length}
        onSubmit={handleBulkRestock}
      />

      <ConfirmDialog
        open={bulkDeleteOpen}
        onClose={() => setBulkDeleteOpen(false)}
        onConfirm={handleBulkDeleteConfirm}
        title="Delete Selected Products"
        message={
          <>
            Are you sure you want to delete <strong>{selectedIds.length}</strong> selected
            product{selectedIds.length === 1 ? '' : 's'}? This action cannot be undone.
          </>
        }
        confirmLabel="Delete All"
        confirmColor="error"
      />
    </Box>
  );
}

ProductList.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      sku: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
      minStock: PropTypes.number.isRequired,
    })
  ).isRequired,
  viewMode: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onAdjustStock: PropTypes.func.isRequired,
};
