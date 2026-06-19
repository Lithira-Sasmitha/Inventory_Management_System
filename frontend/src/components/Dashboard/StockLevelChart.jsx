import React from 'react';
import PropTypes from 'prop-types';
import { Paper, Typography, Box } from '@mui/material';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip as ChartTooltip, CartesianGrid } from 'recharts';

const StockLevelChart = React.memo(({ data }) => {
  return (
    <Paper sx={{ p: 3, height: 380, display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
        Stock Level (Top 10 Products)
      </Typography>
      <Box sx={{ flexGrow: 1, minHeight: 0 }}>
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} />
              <YAxis />
              <ChartTooltip />
              <Bar dataKey="stock" fill="#6366f1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            <Typography variant="body2" color="text.secondary">
              No products stock data to display
            </Typography>
          </Box>
        )}
      </Box>
    </Paper>
  );
});

StockLevelChart.displayName = 'StockLevelChart';

StockLevelChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      stock: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default StockLevelChart;
