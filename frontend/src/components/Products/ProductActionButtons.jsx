import React from 'react';
import PropTypes from 'prop-types';
import { IconButton, Stack, Tooltip } from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  SwapVert as AdjustStockIcon,
} from '@mui/icons-material';

export default function ProductActionButtons({ product, onEdit, onDelete, onAdjustStock }) {
  return (
    <Stack direction="row" spacing={1} justifyContent="center">
      <Tooltip title="Adjust Stock Quantity">
        <IconButton
          color="secondary"
          onClick={() => onAdjustStock(product)}
          size="small"
          sx={{
            border: '1px solid',
            borderColor: 'secondary.light',
            '&:hover': {
              bgcolor: 'secondary.light',
              color: 'secondary.contrastText',
            },
          }}
        >
          <AdjustStockIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Edit Product Details">
        <IconButton
          color="primary"
          onClick={() => onEdit(product)}
          size="small"
          sx={{
            border: '1px solid',
            borderColor: 'primary.light',
            '&:hover': {
              bgcolor: 'primary.light',
              color: 'primary.contrastText',
            },
          }}
        >
          <EditIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete Product">
        <IconButton
          color="error"
          onClick={() => onDelete(product)}
          size="small"
          sx={{
            border: '1px solid',
            borderColor: 'error.light',
            '&:hover': {
              bgcolor: 'error.main',
              color: 'error.contrastText',
            },
          }}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </Stack>
  );
}

ProductActionButtons.propTypes = {
  product: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onAdjustStock: PropTypes.func.isRequired,
};
