export function getStockStatus(quantity, minStock) {
  if (quantity === 0) {
    return { label: 'Out of Stock', color: 'error', progressColor: 'error' };
  }
  if (quantity <= minStock) {
    return { label: 'Low Stock', color: 'warning', progressColor: 'warning' };
  }
  return { label: 'In Stock', color: 'success', progressColor: 'success' };
}

export function getStockPercent(quantity, minStock) {
  const baseline = minStock || 5;
  return Math.min(100, (quantity / (baseline * 2)) * 100);
}

