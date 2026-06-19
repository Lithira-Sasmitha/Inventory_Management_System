import React from 'react';
import PropTypes from 'prop-types';
import { Paper, Typography, Box, List, ListItem, ListItemText, Divider, Chip } from '@mui/material';

const LowStockAlerts = React.memo(({ alerts }) => {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
        Low Stock & Out of Stock Alerts
      </Typography>
      {alerts.length > 0 ? (
        <List disablePadding>
          {alerts.map((product, idx) => (
            <React.Fragment key={product.id}>
              {idx > 0 && <Divider />}
              <ListItem sx={{ py: 1.5, px: 0, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'stretch', sm: 'center' }, gap: { xs: 1.5, sm: 0 } }}>
                <ListItemText
                  primary={product.name}
                  secondary={`SKU: ${product.sku} | Category: ${product.category}`}
                  primaryTypographyProps={{ fontWeight: 600 }}
                />
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'space-between', sm: 'flex-end' }, gap: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Min Level: {product.minStock}
                  </Typography>
                  <Chip
                    label={product.quantity === 0 ? 'Out of Stock' : `Low Stock: ${product.quantity}`}
                    color={product.quantity === 0 ? 'error' : 'warning'}
                    size="small"
                    sx={{ fontWeight: 600 }}
                  />
                </Box>
              </ListItem>
            </React.Fragment>
          ))}
        </List>
      ) : (
        <Box sx={{ py: 2, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            All products stock levels are healthy!
          </Typography>
        </Box>
      )}
    </Paper>
  );
});

LowStockAlerts.displayName = 'LowStockAlerts';

LowStockAlerts.propTypes = {
  alerts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      sku: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
      minStock: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default LowStockAlerts;
