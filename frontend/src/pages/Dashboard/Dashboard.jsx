import React from 'react';
import { Box, Paper, Typography } from '@mui/material';

export default function Dashboard() {
  return (
    <Box sx={{ p: { xs: 3, sm: 4 } }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
        Dashboard Overview
      </Typography>
      <Paper sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h5" gutterBottom color="primary" sx={{ fontWeight: 600 }}>
          Welcome back, Admin!
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Here you will find real-time stock levels, low inventory alerts, order statuses, and supplier summaries.
        </Typography>
        <Box className="p-4 rounded-lg bg-indigo-50 dark:bg-slate-800 border border-indigo-200 dark:border-slate-700 transition">
          <Typography variant="body2" className="text-indigo-600 dark:text-indigo-300 font-mono">
            Note: Tailwind CSS classes successfully compile and adapt to dark/light theme adjustments!
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}
