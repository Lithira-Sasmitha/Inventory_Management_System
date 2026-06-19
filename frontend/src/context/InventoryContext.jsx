import React, { createContext, useContext, useCallback } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const InventoryContext = createContext(null);

export function InventoryProvider({ children }) {
  const [products, setProducts] = useLocalStorage('inventory_products', []);
  const [categories, setCategories] = useLocalStorage('inventory_categories', []);
  const [stockHistory, setStockHistory] = useLocalStorage('inventory_stock_history', []);


  const addProduct = useCallback((productData) => {
    const newProduct = {
      ...productData,
      id: crypto.randomUUID(),
      quantity: Number(productData.quantity) || 0,
      price: Number(productData.price) || 0,
      minStock: Number(productData.minStock) || 0,
    };
    setProducts((prev) => [...prev, newProduct]);
  }, [setProducts]);

  const updateProduct = useCallback((id, updatedFields) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updatedFields } : p))
    );
  }, [setProducts]);

  const deleteProduct = useCallback((id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }, [setProducts]);

  const deleteProducts = useCallback((ids) => {
    setProducts((prev) => prev.filter((p) => !ids.includes(p.id)));
  }, [setProducts]);

  const adjustStock = useCallback((productId, amount, reason) => {
    setProducts((prevProducts) => {
      const product = prevProducts.find((p) => p.id === productId);
      if (!product) return prevProducts;

      const newQty = Math.max(0, product.quantity + amount);
      
      setStockHistory((prevHistory) => [
        {
          id: crypto.randomUUID(),
          productId,
          productName: product.name,
          type: amount >= 0 ? 'STOCK_IN' : 'STOCK_OUT',
          quantityChanged: Math.abs(amount),
          newQuantity: newQty,
          reason: reason || 'Manual adjustment',
          timestamp: new Date().toISOString(),
        },
        ...prevHistory,
      ]);

      return prevProducts.map((p) =>
        p.id === productId ? { ...p, quantity: newQty } : p
      );
    });
  }, [setProducts, setStockHistory]);

  const bulkAdjustStock = useCallback((productIds, amount, reason) => {
    setProducts((prevProducts) => {
      const updatedProducts = prevProducts.map((p) => {
        if (productIds.includes(p.id)) {
          return { ...p, quantity: Math.max(0, p.quantity + amount) };
        }
        return p;
      });

      setStockHistory((prevHistory) => {
        const newHistoryEntries = [];
        productIds.forEach((productId) => {
          const product = prevProducts.find((p) => p.id === productId);
          if (product) {
            const newQty = Math.max(0, product.quantity + amount);
            newHistoryEntries.push({
              id: crypto.randomUUID(),
              productId,
              productName: product.name,
              type: amount >= 0 ? 'STOCK_IN' : 'STOCK_OUT',
              quantityChanged: Math.abs(amount),
              newQuantity: newQty,
              reason: reason || 'Bulk restock adjustment',
              timestamp: new Date().toISOString(),
            });
          }
        });
        return [...newHistoryEntries, ...prevHistory];
      });

      return updatedProducts;
    });
  }, [setProducts, setStockHistory]);

  const addCategory = useCallback((categoryData) => {
    const newCategory = {
      ...categoryData,
      id: crypto.randomUUID(),
    };
    setCategories((prev) => [...prev, newCategory]);
  }, [setCategories]);

  const deleteCategory = useCallback((id) => {
    setCategories((prevCategories) => {
      const category = prevCategories.find((c) => c.id === id);
      if (!category) return prevCategories;

      const hasProducts = products.some(
        (p) => p.category?.toLowerCase().trim() === category.name?.toLowerCase().trim()
      );
      if (hasProducts) {
        return prevCategories;
      }

      return prevCategories.filter((c) => c.id !== id);
    });
  }, [setCategories, products]);

  const value = {
    products,
    categories,
    stockHistory,
    addProduct,
    updateProduct,
    deleteProduct,
    deleteProducts,
    adjustStock,
    bulkAdjustStock,
    addCategory,
    deleteCategory,
  };

  return (
    <InventoryContext.Provider value={value}>
      {children}
    </InventoryContext.Provider>
  );
}

export function useInventory() {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error('useInventory must be used within an InventoryProvider');
  }
  return context;
}
