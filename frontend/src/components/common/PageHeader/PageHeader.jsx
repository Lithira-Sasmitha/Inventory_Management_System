import React from 'react';
import PropTypes from 'prop-types';
import { Box, InputBase, Button } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

const STYLES = {
  header: {
    display: { xs: 'none', md: 'flex' },
    alignItems: 'center',
    justifyContent: 'space-between',
    py: 2.5,
    px: 4,
    bgcolor: 'background.default',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  searchContainer: {
    display: 'flex',
    alignItems: 'center',
    bgcolor: 'background.paper',
    borderRadius: '50px',
    px: 2.5,
    py: 0.75,
    width: 380,
    border: '1px solid',
    borderColor: 'divider',
    transition: 'all 0.2s ease-in-out',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.02)',
    '&:focus-within': {
      borderColor: 'primary.main',
      boxShadow: '0 4px 12px rgba(99, 102, 241, 0.08)',
    },
  },
  searchIcon: {
    color: 'text.secondary',
    mr: 1.5,
    fontSize: 20,
  },
  searchInput: {
    width: '100%',
    fontSize: '0.875rem',
    color: 'text.primary',
    '& input::placeholder': {
      color: 'text.secondary',
      opacity: 0.7,
    },
  },
  actionButton: {
    borderRadius: '10px',
    px: 3,
    py: 1.2,
    fontSize: '0.875rem',
    fontWeight: 600,
    boxShadow: '0 4px 12px rgba(79, 70, 229, 0.2)',
    '&:hover': {
      boxShadow: '0 6px 16px rgba(79, 70, 229, 0.3)',
    },
  },
};

const PageHeader = React.memo(({
  searchPlaceholder = 'Search...',
  searchValue = '',
  onSearchChange = null,
  actionLabel = '',
  actionIcon = null,
  onActionClick = null,
}) => {
  const hasSearch = Boolean(onSearchChange);
  const hasAction = Boolean(actionLabel && onActionClick);

  if (!hasSearch && !hasAction) {
    return null;
  }

  return (
    <Box component="header" sx={STYLES.header}>
      {hasSearch ? (
        <Box sx={STYLES.searchContainer}>
          <SearchIcon sx={STYLES.searchIcon} aria-hidden="true" />
          <InputBase
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={onSearchChange}
            inputProps={{
              'aria-label': searchPlaceholder,
              type: 'search',
            }}
            sx={STYLES.searchInput}
          />
        </Box>
      ) : (
        <Box />
      )}

      {hasAction ? (
        <Button
          variant="contained"
          color="primary"
          onClick={onActionClick}
          startIcon={actionIcon}
          sx={STYLES.actionButton}
          aria-label={actionLabel}
        >
          {actionLabel}
        </Button>
      ) : null}
    </Box>
  );
});

PageHeader.displayName = 'PageHeader';

PageHeader.propTypes = {
  searchPlaceholder: PropTypes.string,
  searchValue: PropTypes.string,
  onSearchChange: PropTypes.func,
  actionLabel: PropTypes.string,
  actionIcon: PropTypes.node,
  onActionClick: PropTypes.func,
};

export default PageHeader;
