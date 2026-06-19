import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  Chip,
  LinearProgress,
  Stack,
  Typography,
  Tooltip,
} from '@mui/material';
import { getStockStatus, getStockPercent } from '../../utils/stockStatus';
import ProductActionButtons from './ProductActionButtons';
import CategoryChip from '../Categories/CategoryChip';

export default function ProductCard({ product, isSelected, onSelect, onEdit, onDelete, onAdjustStock }) {
  const status = getStockStatus(product.quantity, product.minStock);
  const stockPercent = getStockPercent(product.quantity, product.minStock);

  return (
    <Card
      elevation={0}
      sx={{
        border: '1px solid',
        borderColor: isSelected ? 'primary.main' : 'divider',
        position: 'relative',
        transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
        bgcolor: isSelected
          ? (theme) =>
              theme.palette.mode === 'light'
                ? 'rgba(79, 70, 229, 0.03)'
                : 'rgba(99, 102, 241, 0.06)'
          : 'background.paper',
        boxShadow: isSelected
          ? (theme) =>
              theme.palette.mode === 'light'
                ? '0 0 0 1px #4f46e5, 0 8px 20px rgba(79, 70, 229, 0.08)'
                : '0 0 0 1px #6366f1, 0 8px 20px rgba(99, 102, 241, 0.12)'
          : 'none',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: isSelected
            ? (theme) =>
                theme.palette.mode === 'light'
                  ? '0 0 0 1px #4f46e5, 0 12px 28px rgba(79, 70, 229, 0.12)'
                  : '0 0 0 1px #6366f1, 0 12px 28px rgba(99, 102, 241, 0.16)'
            : '0 8px 24px rgba(0, 0, 0, 0.06)',
          borderColor: isSelected ? 'primary.main' : 'primary.light',
        },
      }}
    >
      <CardContent sx={{ pt: 3, pb: 1.5, px: 3 }}>
        <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between" sx={{ mb: 1.5 }}>
          <Stack direction="row" spacing={1} alignItems="center" sx={{ minWidth: 0, flexWrap: 'wrap', gap: 0.75 }}>
            <Typography
              variant="caption"
              sx={{
                fontFamily: 'monospace',
                fontWeight: 700,
                color: 'text.secondary',
                bgcolor: 'action.hover',
                py: 0.5,
                px: 1,
                borderRadius: 1.5,
                border: '1px solid',
                borderColor: 'divider',
                whiteSpace: 'nowrap',
              }}
            >
              {product.sku}
            </Typography>
            <CategoryChip label={product.category} />
          </Stack>
          <Checkbox
            checked={isSelected}
            onChange={() => onSelect(product.id)}
            color="primary"
            sx={{
              p: 0.5,
              borderRadius: 1,
              flexShrink: 0,
              '&:hover': { bgcolor: 'action.hover' },
            }}
          />
        </Stack>

        <Tooltip title={product.name} enterDelay={500} arrow>
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontWeight: 700,
              lineHeight: 1.3,
              mb: 1.5,
              color: 'text.primary',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              height: 48,
              cursor: 'default',
            }}
          >
            {product.name}
          </Typography>
        </Tooltip>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', mb: 2 }}>
          <Typography variant="h5" color="primary.main" sx={{ fontWeight: 800 }}>
            ${product.price.toFixed(2)}
          </Typography>
          <Chip
            label={status.label}
            color={status.color}
            size="small"
            sx={{ fontWeight: 700 }}
          />
        </Box>

        <Box sx={{ mt: 2.5, mb: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.75 }}>
            <Typography variant="caption" color="text.secondary" fontWeight="500">
              Stock Level
            </Typography>
            <Typography variant="caption" fontWeight="700" color="text.primary">
              {product.quantity} / {product.minStock} (min)
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={stockPercent}
            color={status.progressColor}
            sx={{
              height: 7,
              borderRadius: 3.5,
              bgcolor: (theme) =>
                theme.palette.mode === 'light' ? 'grey.200' : 'grey.800',
              '& .MuiLinearProgress-bar': { borderRadius: 3.5 },
            }}
          />
        </Box>
      </CardContent>

      <CardActions
        sx={{
          px: 3,
          pb: 2.5,
          pt: 1.5,
          borderTop: '1px solid',
          borderColor: 'divider',
          display: 'flex',
          justifyContent: 'flex-end',
          gap: 1,
        }}
      >
        <ProductActionButtons
          product={product}
          onEdit={onEdit}
          onDelete={onDelete}
          onAdjustStock={onAdjustStock}
        />
      </CardActions>
    </Card>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    sku: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    minStock: PropTypes.number.isRequired,
  }).isRequired,
  isSelected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onAdjustStock: PropTypes.func.isRequired,
};
