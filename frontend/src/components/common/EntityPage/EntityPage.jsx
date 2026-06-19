import React from 'react';
import PropTypes from 'prop-types';
import { Box, Paper, Typography, Button } from '@mui/material';
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
      />

      <Box sx={{ p: { xs: 1.5, sm: 2, md: 4 } }}>
        <Paper sx={{ p: { xs: 2, sm: 3, md: 4 }, borderRadius: 3 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: 'space-between',
              alignItems: { xs: 'flex-start', sm: 'center' },
              gap: 2,
              mb: 3,
            }}
          >
            <Box>
              <Typography variant="h5" color="primary" sx={{ fontWeight: 700, mb: 0.5 }}>
                {title}
              </Typography>
              {description && (
                <Typography variant="body1" color="text.secondary">
                  {description}
                </Typography>
              )}
            </Box>

            {actionLabel && onActionClick && (
              <Box sx={{ alignSelf: { xs: 'stretch', sm: 'auto' } }}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={actionIcon}
                  onClick={onActionClick}
                  fullWidth
                  sx={{
                    borderRadius: 2,
                    fontWeight: 600,
                    textTransform: 'none',
                    height: 40,
                    px: 3,
                    boxShadow: '0 4px 12px rgba(79, 70, 229, 0.2)',
                    '&:hover': {
                      boxShadow: '0 6px 16px rgba(79, 70, 229, 0.3)',
                    },
                  }}
                >
                  {actionLabel}
                </Button>
              </Box>
            )}
          </Box>

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
