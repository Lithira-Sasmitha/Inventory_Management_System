import React from 'react';
import PropTypes from 'prop-types';
import { Box, MenuItem, TextField, InputAdornment, Button, Typography, ToggleButtonGroup, ToggleButton, Tooltip } from '@mui/material';
import {
  Category as CategoryIcon,
  FilterList as FilterListIcon,
  Download as ExportIcon,
  Clear as ClearIcon,
  ViewList as ViewListIcon,
  GridView as GridViewIcon,
} from '@mui/icons-material';
import SearchBar from '../common/SearchBar';

export default function ProductFilterToolbar({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedStockStatus,
  onStockStatusChange,
  categories = [],
  totalProductsCount,
  filteredProductsCount,
  viewMode,
  onViewModeChange,
  onExportCSV,
  productsCount,
}) {
  const hasActiveFilters = Boolean(searchQuery || selectedCategory || selectedStockStatus);

  const handleClearAll = () => {
    onSearchChange({ target: { value: '' } });
    onCategoryChange('');
    onStockStatusChange('');
  };

  return (
    <Box
      sx={{
        p: 2,
        mb: 3.5,
        borderRadius: 3,
        border: '1px solid',
        borderColor: 'divider',
        bgcolor: (theme) =>
          theme.palette.mode === 'light' ? 'rgba(241, 245, 249, 0.4)' : 'rgba(30, 41, 59, 0.3)',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 2,
            alignItems: 'center',
            flexGrow: 1,
          }}
        >
          <Box sx={{ flexGrow: { xs: 1, sm: 1, md: 0 }, minWidth: { xs: '100%', sm: 300, md: 320 } }}>
            <SearchBar
              placeholder="Search products by name or SKU..."
              value={searchQuery}
              onChange={onSearchChange}
            />
          </Box>

          <TextField
            select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            size="small"
            variant="outlined"
            slotProps={{
              select: {
                displayEmpty: true,
              },
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <CategoryIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                  </InputAdornment>
                ),
              }
            }}
            sx={{
              minWidth: { xs: '100%', sm: 180 },
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                bgcolor: 'background.paper',
                transition: 'all 0.2s ease-in-out',
                pl: 1.5,
                height: 40,
                '&:hover': {
                  borderColor: 'primary.main',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                },
                '&.Mui-focused': {
                  boxShadow: '0 4px 12px rgba(99, 102, 241, 0.08)',
                },
              },
            }}
          >
            <MenuItem value="">All Categories</MenuItem>
            {categories.map((cat) => (
              <MenuItem key={cat.id} value={cat.name}>
                {cat.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            value={selectedStockStatus}
            onChange={(e) => onStockStatusChange(e.target.value)}
            size="small"
            variant="outlined"
            slotProps={{
              select: {
                displayEmpty: true,
              },
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <FilterListIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                  </InputAdornment>
                ),
              }
            }}
            sx={{
              minWidth: { xs: '100%', sm: 180 },
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                bgcolor: 'background.paper',
                transition: 'all 0.2s ease-in-out',
                pl: 1.5,
                height: 40,
                '&:hover': {
                  borderColor: 'primary.main',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                },
                '&.Mui-focused': {
                  boxShadow: '0 4px 12px rgba(99, 102, 241, 0.08)',
                },
              },
            }}
          >
            <MenuItem value="">All Statuses</MenuItem>
            <MenuItem value="in_stock">In Stock</MenuItem>
            <MenuItem value="out_of_stock">Out of Stock</MenuItem>
          </TextField>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            justifyContent: { xs: 'space-between', sm: 'flex-end' },
            width: { xs: '100%', md: 'auto' },
          }}
        >
          <Button
            variant="outlined"
            color="inherit"
            startIcon={<ExportIcon />}
            onClick={onExportCSV}
            disabled={productsCount === 0}
            sx={{
              borderRadius: 2,
              borderColor: 'divider',
              color: 'text.secondary',
              fontWeight: 600,
              textTransform: 'none',
              height: 40,
              '&:hover': {
                borderColor: 'text.primary',
                bgcolor: 'action.hover',
              },
            }}
          >
            Export CSV
          </Button>

          <ToggleButtonGroup
            value={viewMode}
            exclusive
            onChange={onViewModeChange}
            aria-label="view mode toggle"
            size="small"
            sx={{
              bgcolor: 'action.hover',
              borderRadius: 2,
              p: 0.5,
              height: 40,
              boxSizing: 'border-box',
              border: '1px solid',
              borderColor: 'divider',
              '& .MuiToggleButtonGroup-grouped': {
                border: 0,
                borderRadius: 1.5,
                mx: 0.25,
                px: 1.5,
                '&.Mui-selected': {
                  bgcolor: 'primary.main',
                  color: 'primary.contrastText',
                  '&:hover': { bgcolor: 'primary.dark' },
                },
              },
            }}
          >
            <ToggleButton value="table" aria-label="table view">
              <Tooltip title="Table View">
                <ViewListIcon fontSize="small" />
              </Tooltip>
            </ToggleButton>
            <ToggleButton value="card" aria-label="card view">
              <Tooltip title="Card View">
                <GridViewIcon fontSize="small" />
              </Tooltip>
            </ToggleButton>
          </ToggleButtonGroup>
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
            Found <strong>{filteredProductsCount}</strong> matching product{filteredProductsCount === 1 ? '' : 's'}{' '}
            <Typography component="span" variant="caption" color="text.secondary" sx={{ fontStyle: 'italic' }}>
              (filtered from {totalProductsCount} total)
            </Typography>
          </Typography>

          <Button
            size="small"
            color="primary"
            onClick={handleClearAll}
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
  );
}

ProductFilterToolbar.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  selectedCategory: PropTypes.string.isRequired,
  onCategoryChange: PropTypes.func.isRequired,
  selectedStockStatus: PropTypes.string.isRequired,
  onStockStatusChange: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
  totalProductsCount: PropTypes.number.isRequired,
  filteredProductsCount: PropTypes.number.isRequired,
  viewMode: PropTypes.string.isRequired,
  onViewModeChange: PropTypes.func.isRequired,
  onExportCSV: PropTypes.func.isRequired,
  productsCount: PropTypes.number.isRequired,
};
