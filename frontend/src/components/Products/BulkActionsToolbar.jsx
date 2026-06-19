import React from 'react';
import PropTypes from 'prop-types';
import { Button, Checkbox, Fade, Paper, Stack, Typography } from '@mui/material';
import {
  Delete as DeleteIcon,
  Layers as RestockIcon,
} from '@mui/icons-material';

export default function BulkActionsToolbar({
  selectedCount,
  isAllPageSelected,
  isSomePageSelected,
  onSelectAll,
  onRestockClick,
  onDeleteClick,
}) {
  return (
    <Fade in={selectedCount > 0}>
      <Paper
        elevation={0}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          p: 1.5,
          px: 2.5,
          bgcolor: (theme) =>
            theme.palette.mode === 'light'
              ? 'rgba(79, 70, 229, 0.06)'
              : 'rgba(99, 102, 241, 0.12)',
          border: '1px solid',
          borderColor: 'primary.light',
          borderRadius: 3,
        }}
      >
        <Stack direction="row" spacing={1} alignItems="center">
          <Checkbox
            indeterminate={isSomePageSelected}
            checked={isAllPageSelected}
            onChange={onSelectAll}
            color="primary"
          />
          <Typography variant="subtitle2" fontWeight="700" color="primary.main">
            {selectedCount} {selectedCount === 1 ? 'item' : 'items'} selected
          </Typography>
        </Stack>
        <Stack direction="row" spacing={1.5}>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            startIcon={<RestockIcon />}
            onClick={onRestockClick}
            sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600 }}
          >
            Restock Selected
          </Button>
          <Button
            variant="contained"
            color="error"
            size="small"
            startIcon={<DeleteIcon />}
            onClick={onDeleteClick}
            sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600 }}
          >
            Delete Selected
          </Button>
        </Stack>
      </Paper>
    </Fade>
  );
}

BulkActionsToolbar.propTypes = {
  selectedCount: PropTypes.number.isRequired,
  isAllPageSelected: PropTypes.bool.isRequired,
  isSomePageSelected: PropTypes.bool.isRequired,
  onSelectAll: PropTypes.func.isRequired,
  onRestockClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
};
