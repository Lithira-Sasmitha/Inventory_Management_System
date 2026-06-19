import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import ActionButton from '../ActionButton';
import SearchBar from '../SearchBar';

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
        <SearchBar
          placeholder={searchPlaceholder}
          value={searchValue}
          onChange={onSearchChange}
        />
      ) : (
        <Box />
      )}

      {hasAction ? (
        <ActionButton
          label={actionLabel}
          icon={actionIcon}
          onClick={onActionClick}
        />
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
