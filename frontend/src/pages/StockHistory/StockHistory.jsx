import React from 'react';
import EntityPage from '../../components/common/EntityPage/EntityPage';
import { useInventory } from '../../context/InventoryContext';
import StockHistoryLog from '../../components/StockHistory/StockHistory';

export default function StockHistory() {
  const { products, stockHistory } = useInventory();

  return (
    <EntityPage
      title="Stock History Ledger"
      description="Chronological audit logs of all inventory items adjustments, restocks, and sales transactions."
      isEmpty={stockHistory.length === 0}
      emptyText="No transaction ledger entries found. Perform restocks or sales on the Products page to see logs here."
    >
      <StockHistoryLog products={products} stockHistory={stockHistory} />
    </EntityPage>
  );
}
