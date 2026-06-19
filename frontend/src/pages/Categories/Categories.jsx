import React, { useState, useCallback } from 'react';
import { Add as AddIcon } from '@mui/icons-material';
import EntityPage from '../../components/common/EntityPage/EntityPage';
import useSearch from '../../hooks/useSearch';
import { useInventory } from '../../context/InventoryContext';
import CategoryFormDialog from '../../components/Categories/CategoryFormDialog';
import CategoryManager from '../../components/Categories/CategoryManager';

export default function Categories() {
  const { addCategory } = useInventory();
  const { searchQuery, handleSearchChange } = useSearch();
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

  return (
    <>
      <EntityPage
        title="Product Categories"
        description="Organize inventory items into logical classification hierarchies."
        searchPlaceholder="Search categories..."
        searchValue={searchQuery}
        onSearchChange={handleSearchChange}
        actionLabel="Add Category"
        actionIcon={<AddIcon />}
        onActionClick={handleAddCategoryClick}
      >
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
