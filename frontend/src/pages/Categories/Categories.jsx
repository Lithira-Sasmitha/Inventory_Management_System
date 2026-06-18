import React, { useState, useCallback } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import PageHeader from '../../components/common/PageHeader/PageHeader';

export default function Categories() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []);

  const handleAddCategory = useCallback(() => {
    console.log('Action Triggered: Open Add Category Modal or Navigate to Create view');
    alert('Add Category button clicked!');
  }, []);

  return (
    <Box>
      <PageHeader
        searchPlaceholder="Search categories..."
        searchValue={searchQuery}
        onSearchChange={handleSearchChange}
        actionLabel="Add Category"
        actionIcon={<AddIcon />}
        onActionClick={handleAddCategory}
      />

      <Box sx={{ p: { xs: 3, sm: 4 } }}>
        <Paper sx={{ p: 4, borderRadius: 3 }}>
          <Typography variant="h5" gutterBottom color="primary" sx={{ fontWeight: 700 }}>
            Product Categories
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Organize inventory items into logical classification hierarchies.
          </Typography>

          <Box sx={{ p: 2, bgcolor: 'action.hover', borderRadius: 2, border: '1px dashed', borderColor: 'divider' }}>
            <Typography variant="body2" color="text.primary" sx={{ fontStyle: 'italic' }}>
              Active Search Query: {searchQuery ? `"${searchQuery}"` : 'None (showing all categories)'}
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}
