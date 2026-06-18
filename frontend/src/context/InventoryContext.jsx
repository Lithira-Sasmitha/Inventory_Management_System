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

  const addCategory = useCallback((categoryData) => {
    const newCategory = {
      ...categoryData,
      id: crypto.randomUUID(),
    };
    setCategories((prev) => [...prev, newCategory]);
  }, [setCategories]);

  const deleteCategory = useCallback((id) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
  }, [setCategories]);

  const value = {
    products,
    categories,
    stockHistory,
    addProduct,
    updateProduct,
    deleteProduct,
    adjustStock,
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
