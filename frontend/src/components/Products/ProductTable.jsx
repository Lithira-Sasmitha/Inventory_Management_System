import React from 'react';
import PropTypes from 'prop-types';
import {
  Checkbox,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { getStockStatus } from '../../utils/stockStatus';
import ProductActionButtons from './ProductActionButtons';

export default function ProductTable({
  products,
  selectedIds,
  isAllPageSelected,
  isSomePageSelected,
  onSelectAll,
  onSelectOne,
  onEdit,
  onDelete,
  onAdjustStock,
}) {
  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 3, overflow: 'hidden' }}
    >
      <Table aria-label="products table">
        <TableHead sx={{ bgcolor: 'action.hover' }}>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
                indeterminate={isSomePageSelected}
                checked={isAllPageSelected}
                onChange={onSelectAll}
                color="primary"
              />
            </TableCell>
            <TableCell sx={{ fontWeight: 700 }}>SKU</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Product Name</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Category</TableCell>
            <TableCell sx={{ fontWeight: 700 }} align="right">Price</TableCell>
            <TableCell sx={{ fontWeight: 700 }} align="right">Stock Qty</TableCell>
            <TableCell sx={{ fontWeight: 700 }} align="right">Min Alert</TableCell>
            <TableCell sx={{ fontWeight: 700 }} align="center">Status</TableCell>
            <TableCell sx={{ fontWeight: 700 }} align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => {
            const status = getStockStatus(product.quantity, product.minStock);
            const isSelected = selectedIds.includes(product.id);

            return (
              <TableRow
                key={product.id}
                selected={isSelected}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                  transition: 'background-color 0.2s',
                  '&:hover': { bgcolor: 'action.hover' },
                  '&.Mui-selected': {
                    bgcolor: (theme) =>
                      theme.palette.mode === 'light'
                        ? 'rgba(79, 70, 229, 0.03)'
                        : 'rgba(99, 102, 241, 0.05)',
                    '&:hover': {
                      bgcolor: (theme) =>
                        theme.palette.mode === 'light'
                          ? 'rgba(79, 70, 229, 0.06)'
                          : 'rgba(99, 102, 241, 0.08)',
                    },
                  },
                }}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={isSelected}
                    onChange={() => onSelectOne(product.id)}
                    color="primary"
                  />
                </TableCell>
                <TableCell sx={{ fontFamily: 'monospace', fontWeight: 600, color: 'text.secondary' }}>
                  {product.sku}
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: 'text.primary' }}>
                  {product.name}
                </TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell align="right" sx={{ fontWeight: 600 }}>
                  ${product.price.toFixed(2)}
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: 600 }}>
                  {product.quantity}
                </TableCell>
                <TableCell align="right" sx={{ color: 'text.secondary' }}>
                  {product.minStock}
                </TableCell>
                <TableCell align="center">
                  <Chip
                    label={status.label}
                    color={status.color}
                    size="small"
                    sx={{ fontWeight: 700, minWidth: 100 }}
                  />
                </TableCell>
                <TableCell align="center">
                  <ProductActionButtons
                    product={product}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onAdjustStock={onAdjustStock}
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

ProductTable.propTypes = {
  products: PropTypes.array.isRequired,
  selectedIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  isAllPageSelected: PropTypes.bool.isRequired,
  isSomePageSelected: PropTypes.bool.isRequired,
  onSelectAll: PropTypes.func.isRequired,
  onSelectOne: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onAdjustStock: PropTypes.func.isRequired,
};
