import React, { useMemo } from 'react';
import { Grid, Box, Typography } from '@mui/material';
import {
  Inventory2Outlined as ProductsIcon,
  AttachMoney as MoneyIcon,
  WarningAmber as OutOfStockIcon,
  CategoryOutlined as CategoriesIcon,
} from '@mui/icons-material';
import { useInventory } from '../../context/InventoryContext';
import StatCard from './StatCard';
import CategoryChart from './CategoryChart';
import StockLevelChart from './StockLevelChart';
import LowStockAlerts from './LowStockAlerts';

export default function Dashboard() {
  const { products, categories } = useInventory();

  const totalProducts = products.length;
  const totalCategories = categories.length;

  const totalValue = useMemo(() => {
    return products.reduce((acc, p) => acc + p.price * p.quantity, 0);
  }, [products]);

  const outOfStock = useMemo(() => {
    return products.filter((p) => p.quantity === 0).length;
  }, [products]);

  const pieData = useMemo(() => {
    const categoryCounts = {};
    products.forEach((p) => {
      const cat = p.category || 'Uncategorized';
      categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
    });
    return Object.keys(categoryCounts).map((catName) => ({
      name: catName,
      value: categoryCounts[catName],
    }));
  }, [products]);

  const barData = useMemo(() => {
    return [...products]
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 10)
      .map((p) => ({
        name: p.name,
        stock: p.quantity,
      }));
  }, [products]);

  const lowStockAlerts = useMemo(() => {
    return products.filter((p) => p.quantity <= p.minStock);
  }, [products]);

  return (
    <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 700, color: 'text.primary' }}>
        Dashboard Analytics
      </Typography>

      <Grid container spacing={{ xs: 2, md: 3 }} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Products"
            value={totalProducts}
            icon={<ProductsIcon />}
            color="primary.main"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Inventory Value"
            value={`$${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            icon={<MoneyIcon />}
            color="success.main"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Out of Stock"
            value={outOfStock}
            icon={<OutOfStockIcon />}
            color="error.main"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Categories"
            value={totalCategories}
            icon={<CategoriesIcon />}
            color="warning.main"
          />
        </Grid>
      </Grid>

      <Grid container spacing={{ xs: 2, md: 3 }} sx={{ mb: 4 }}>
        <Grid item xs={12} lg={6}>
          <CategoryChart data={pieData} />
        </Grid>
        <Grid item xs={12} lg={6}>
          <StockLevelChart data={barData} />
        </Grid>
      </Grid>

      <Grid container spacing={{ xs: 2, md: 3 }}>
        <Grid item xs={12}>
          <LowStockAlerts alerts={lowStockAlerts} />
        </Grid>
      </Grid>
    </Box>
  );
}
