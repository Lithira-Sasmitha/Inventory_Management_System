import React from 'react';
import PropTypes from 'prop-types';
import { Box, Paper, Typography } from '@mui/material';
import PageHeader from '../PageHeader/PageHeader';

export default function EntityPage({
  title,
  description,
  searchPlaceholder,
  searchValue = '',
  onSearchChange = null,
  actionLabel = '',
  actionIcon = null,
  onActionClick = null,
  emptyText = 'No items found',
  isEmpty = false,
  children,
}) {
  return (
    <Box>
      <PageHeader
        searchPlaceholder={searchPlaceholder}
        searchValue={searchValue}
        onSearchChange={onSearchChange}
        actionLabel={actionLabel}
        actionIcon={actionIcon}
        onActionClick={onActionClick}
      />

      <Box sx={{ p: { xs: 3, sm: 4 } }}>
        <Paper sx={{ p: 4, borderRadius: 3 }}>
          <Typography variant="h5" gutterBottom color="primary" sx={{ fontWeight: 700 }}>
            {title}
          </Typography>
          {description && (
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              {description}
            </Typography>
          )}

          {isEmpty ? (
            <Box sx={{ p: 3, textAlign: 'center', color: 'text.secondary' }}>
              <Typography variant="body1">{emptyText}</Typography>
            </Box>
          ) : (
            children
          )}
        </Paper>
      </Box>
    </Box>
  );
}

EntityPage.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  searchPlaceholder: PropTypes.string,
  searchValue: PropTypes.string,
  onSearchChange: PropTypes.func,
  actionLabel: PropTypes.string,
  actionIcon: PropTypes.node,
  onActionClick: PropTypes.func,
  emptyText: PropTypes.string,
  isEmpty: PropTypes.bool,
  children: PropTypes.node,
};
