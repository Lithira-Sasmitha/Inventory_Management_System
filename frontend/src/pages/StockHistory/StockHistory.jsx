import React from 'react';
import { Box, Paper, Typography } from '@mui/material';

export default function StockHistory() {
  return (
    <Box sx={{ p: { xs: 3, sm: 4 } }}>
      <Paper sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h5" gutterBottom color="primary" sx={{ fontWeight: 700 }}>
          Stock Ledger & Audit Logs
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Track transaction history, stock adjustments, intake logs, and shipment records.
        </Typography>
      </Paper>
    </Box>
  );
}
