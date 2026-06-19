import React, { useCallback } from 'react';
import { Box, Typography } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import EntityPage from '../../components/common/EntityPage/EntityPage';
import useSearch from '../../hooks/useSearch';

export default function Categories() {
  const { searchQuery, handleSearchChange } = useSearch();

  const handleAddCategory = useCallback(() => {
    console.log('Action Triggered: Open Add Category Modal or Navigate to Create view');
    alert('Add Category button clicked!');
  }, []);

  return (
    <EntityPage
      title="Product Categories"
      description="Organize inventory items into logical classification hierarchies."
      searchPlaceholder="Search categories..."
      searchValue={searchQuery}
      onSearchChange={handleSearchChange}
      actionLabel="Add Category"
      actionIcon={<AddIcon />}
      onActionClick={handleAddCategory}
    >
      <Box sx={{ p: 2, bgcolor: 'action.hover', borderRadius: 2, border: '1px dashed', borderColor: 'divider' }}>
        <Typography variant="body2" color="text.primary" sx={{ fontStyle: 'italic' }}>
          Active Search Query: {searchQuery ? `"${searchQuery}"` : 'None (showing all categories)'}
        </Typography>
      </Box>
    </EntityPage>
  );
}

