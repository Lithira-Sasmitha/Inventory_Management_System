import React, { useCallback } from 'react';
import { Box, Typography } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import EntityPage from '../../components/common/EntityPage/EntityPage';
import useSearch from '../../hooks/useSearch';

export default function Products() {
  const { searchQuery, handleSearchChange } = useSearch();

  const handleAddProduct = useCallback(() => {
    console.log('Action Triggered: Open Add Product Modal or Navigate to Create view');
    alert('Add Product button clicked!');
  }, []);

  return (
    <EntityPage
      title="Products Inventory"
      description="Manage inventory items, barcodes, warehouses, and tracking alerts."
      searchPlaceholder="Search products by name or SKU..."
      searchValue={searchQuery}
      onSearchChange={handleSearchChange}
      actionLabel="Add Product"
      actionIcon={<AddIcon />}
      onActionClick={handleAddProduct}
    >
      <Box sx={{ p: 2, bgcolor: 'action.hover', borderRadius: 2, border: '1px dashed', borderColor: 'divider' }}>
        <Typography variant="body2" color="text.primary" sx={{ fontStyle: 'italic' }}>
          Active Search Query: {searchQuery ? `"${searchQuery}"` : 'None (showing all products)'}
        </Typography>
      </Box>
    </EntityPage>
  );
}

