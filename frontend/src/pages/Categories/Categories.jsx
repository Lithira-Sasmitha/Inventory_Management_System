import React, { useState, useCallback, useMemo } from 'react';
import { Box, Typography, Button } from '@mui/material';
import {
  Add as AddIcon,
  Clear as ClearIcon,
} from '@mui/icons-material';
import EntityPage from '../../components/common/EntityPage/EntityPage';
import useSearch from '../../hooks/useSearch';
import { useInventory } from '../../context/InventoryContext';
import CategoryFormDialog from '../../components/Categories/CategoryFormDialog';
import CategoryManager from '../../components/Categories/CategoryManager';
import SearchBar from '../../components/common/SearchBar';


export default function Categories() {
  const { categories, addCategory } = useInventory();
  const { searchQuery, handleSearchChange, clearSearch } = useSearch();
  const [formOpen, setFormOpen] = useState(false);

  const handleAddCategoryClick = useCallback(() => {
    setFormOpen(true);
  }, []);

  const handleFormClose = useCallback(() => {
    setFormOpen(false);
  }, []);

  const handleFormSubmit = useCallback((categoryData) => {
    addCategory(categoryData);
  }, [addCategory]);



  const hasActiveFilters = Boolean(searchQuery);

  const filteredCategoriesCount = useMemo(() => {
    if (!searchQuery) return categories.length;
    const query = searchQuery.toLowerCase().trim();
    return categories.filter((cat) => cat.name?.toLowerCase().includes(query)).length;
  }, [categories, searchQuery]);

  return (
    <>
      <EntityPage
        title="Product Categories"
        description="Organize inventory items into logical classification hierarchies."
        actionLabel="Add Category"
        actionIcon={<AddIcon />}
        onActionClick={handleAddCategoryClick}
      >
        <Box
          sx={{
            p: { xs: 2, sm: 2.5 },
            mb: 3.5,
            borderRadius: 3.5,
            border: '1px solid',
            borderColor: 'divider',
            background: (theme) =>
              theme.palette.mode === 'light'
                ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.03) 0%, rgba(244, 63, 94, 0.01) 100%)'
                : 'linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(244, 63, 94, 0.02) 100%)',
            boxShadow: '0 2px 12px rgba(0, 0, 0, 0.02)',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Box sx={{ flexGrow: 1, maxWidth: { xs: '100%', md: 360 } }}>
              <SearchBar
                placeholder="Search categories..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </Box>
          </Box>

          {hasActiveFilters && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                mt: 2,
                pt: 2,
                borderTop: '1px solid',
                borderColor: 'divider',
              }}
            >
              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                Found <strong>{filteredCategoriesCount}</strong> matching categor{filteredCategoriesCount === 1 ? 'y' : 'ies'}{' '}
                <Typography component="span" variant="caption" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                  (filtered from {categories.length} total)
                </Typography>
              </Typography>

              <Button
                size="small"
                color="primary"
                onClick={clearSearch}
                startIcon={<ClearIcon />}
                sx={{
                  fontWeight: 600,
                  textTransform: 'none',
                  '&:hover': {
                    bgcolor: 'action.hover',
                  },
                }}
              >
                Clear Filters
              </Button>
            </Box>
          )}
        </Box>

        <CategoryManager searchQuery={searchQuery} />
      </EntityPage>

      <CategoryFormDialog
        open={formOpen}
        onClose={handleFormClose}
        onSubmit={handleFormSubmit}
      />
    </>
  );
}
