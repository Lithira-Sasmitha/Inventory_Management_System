import React, { useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  Typography,
  Chip,
  Box,
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { useInventory } from '../../context/InventoryContext';
import ConfirmDialog from '../common/ConfirmDialog';

export default function CategoryManager({ searchQuery = '' }) {
  const { categories, products, deleteCategory } = useInventory();
  const [deleteTarget, setDeleteTarget] = useState(null);

  const categoryStats = useMemo(() => {
    return categories.map((cat) => {
      const count = products.filter(
        (p) => p.category?.toLowerCase().trim() === cat.name?.toLowerCase().trim()
      ).length;
      return {
        ...cat,
        productCount: count,
      };
    });
  }, [categories, products]);

  const filteredCategories = useMemo(() => {
    if (!searchQuery) return categoryStats;
    const query = searchQuery.toLowerCase().trim();
    return categoryStats.filter((cat) => cat.name?.toLowerCase().includes(query));
  }, [categoryStats, searchQuery]);

  const handleDeleteClick = useCallback((cat) => {
    setDeleteTarget(cat);
  }, []);

  const handleDeleteConfirm = useCallback(() => {
    if (deleteTarget) {
      deleteCategory(deleteTarget.id);
    }
    setDeleteTarget(null);
  }, [deleteTarget, deleteCategory]);

  return (
    <Box>
      {filteredCategories.length === 0 ? (
        <Box
          sx={{
            py: 6,
            textAlign: 'center',
            border: '2px dashed',
            borderColor: 'divider',
            borderRadius: 4,
            bgcolor: 'background.default',
          }}
        >
          <Typography variant="body1" color="text.secondary" sx={{ fontStyle: 'italic' }}>
            No categories found matching your search.
          </Typography>
        </Box>
      ) : (
        <TableContainer
          component={Paper}
          elevation={0}
          sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 3, overflow: 'hidden' }}
        >
          <Table aria-label="categories table">
            <TableHead sx={{ bgcolor: 'action.hover' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>Category Name</TableCell>
                <TableCell sx={{ fontWeight: 700 }} align="center">Associated Products</TableCell>
                <TableCell sx={{ fontWeight: 700 }} align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCategories.map((cat) => {
                const canDelete = cat.productCount === 0;

                return (
                  <TableRow
                    key={cat.id}
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                      transition: 'background-color 0.2s',
                      '&:hover': { bgcolor: 'action.hover' },
                    }}
                  >
                    <TableCell sx={{ fontWeight: 600, color: 'text.primary' }}>
                      {cat.name}
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        label={`${cat.productCount} product${cat.productCount === 1 ? '' : 's'}`}
                        color={cat.productCount > 0 ? 'primary' : 'default'}
                        variant={cat.productCount > 0 ? 'filled' : 'outlined'}
                        size="small"
                        sx={{ fontWeight: 700, minWidth: 100 }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      {canDelete ? (
                        <Tooltip title="Delete Category">
                          <IconButton
                            color="error"
                            onClick={() => handleDeleteClick(cat)}
                            size="small"
                            sx={{
                              border: '1px solid',
                              borderColor: 'error.light',
                              '&:hover': {
                                bgcolor: 'error.main',
                                color: 'error.contrastText',
                              },
                            }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      ) : (
                        <Tooltip title="Cannot delete category with assigned products" arrow>
                          <span>
                            <IconButton
                              color="error"
                              disabled
                              size="small"
                              sx={{
                                border: '1px solid',
                                borderColor: 'action.disabledBackground',
                              }}
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </span>
                        </Tooltip>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Category"
        message={
          <>
            Are you sure you want to delete the category <strong>{deleteTarget?.name}</strong>?
            This action cannot be undone.
          </>
        }
        confirmLabel="Delete"
        confirmColor="error"
      />
    </Box>
  );
}

CategoryManager.propTypes = {
  searchQuery: PropTypes.string,
};
