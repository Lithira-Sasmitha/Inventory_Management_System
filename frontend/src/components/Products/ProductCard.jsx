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
} from '@mui/material';
import { getStockStatus, getStockPercent } from '../../utils/stockStatus';
import ProductActionButtons from './ProductActionButtons';

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
        transition: 'all 0.25s ease-in-out',
        bgcolor: isSelected
          ? (theme) =>
              theme.palette.mode === 'light'
                ? 'rgba(79, 70, 229, 0.02)'
                : 'rgba(99, 102, 241, 0.04)'
          : 'background.paper',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.06)',
          borderColor: isSelected ? 'primary.main' : 'primary.light',
        },
      }}
    >
      <Checkbox
        checked={isSelected}
        onChange={() => onSelect(product.id)}
        color="primary"
        sx={{
          position: 'absolute',
          top: 12,
          right: 12,
          zIndex: 10,
          bgcolor: isSelected ? 'transparent' : 'rgba(255, 255, 255, 0.6)',
          backdropFilter: 'blur(4px)',
          borderRadius: 1.5,
          '&:hover': { bgcolor: 'action.hover' },
        }}
      />

      <CardContent sx={{ pt: 3.5, pb: 1.5, px: 3 }}>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.5 }}>
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
            }}
          >
            {product.sku}
          </Typography>
          <Chip
            label={product.category}
            size="small"
            variant="outlined"
            sx={{
              fontSize: '0.75rem',
              fontWeight: 600,
              borderColor: 'divider',
              color: 'text.secondary',
            }}
          />
        </Stack>

        <Typography
          variant="h6"
          component="div"
          sx={{
            fontWeight: 700,
            lineHeight: 1.3,
            mb: 1.5,
            color: 'text.primary',
            pr: 4,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            height: 48,
          }}
        >
          {product.name}
        </Typography>

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
