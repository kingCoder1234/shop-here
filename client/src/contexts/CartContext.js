import React, { createContext, useState, useContext, useEffect } from "react";
import {
  getCart,
  addToCartAPI,
  removeFromCartAPI,
  updateCartItemAPI,
  buyCartItemsAPI,
} from "../services/cartServices";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCart();
  }, []);
  
  const loadCart = async () => {
    setLoading(true);
    try {
      const cartData = await getCart();
      setCart(cartData);
    } catch (error) {
      console.error("Failed to load cart:", error);
    } finally {
      setLoading(false);
    }
  };
  const addToCart = async (productId) => {
    try {
      const updatedCart = await addToCartAPI(productId);
      setCart(updatedCart);
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const updatedCart = await removeFromCartAPI(productId);
      setCart(updatedCart);
    } catch (error) {
      console.error("Failed to remove from cart:", error);
    }
  };

  const updateCartItem = async (productId, value) => {
    try {
      const updatedCart = await updateCartItemAPI(productId, value);
      setCart(updatedCart);
    } catch (error) {
      console.error("Failed to update cart item:", error);
    }
  };

  const buyCartItems = async () => {
    try {
      const purchaseResult = await buyCartItemsAPI();
      setCart(null);
      return purchaseResult;
    } catch (error) {
      console.error("Failed to buy cart items:", error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        addToCart,
        removeFromCart,
        updateCartItem,
        buyCartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => useContext(CartContext);
