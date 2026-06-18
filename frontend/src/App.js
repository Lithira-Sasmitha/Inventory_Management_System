import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import { Box, Paper, Typography } from '@mui/material';

function PagePlaceholder({ title }) {
  return (
    <Paper sx={{ p: 4, borderRadius: 3 }}>
      <Typography variant="h4" gutterBottom color="primary" sx={{ fontWeight: 700 }}>
        {title} Page
      </Typography>
      <Typography variant="body1" color="text.secondary">
        This is a placeholder view for the {title.toLowerCase()} page of the Inventory Management System. It will contain specific tables, metrics, and administration tools in a future release.
      </Typography>
    </Paper>
  );
}

function DashboardPlaceholder() {
  return (
    <Box>
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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<DashboardPlaceholder />} />
          <Route path="products" element={<PagePlaceholder title="Products" />} />
          <Route path="categories" element={<PagePlaceholder title="Categories" />} />
          <Route path="stock-history" element={<PagePlaceholder title="Stock History" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
