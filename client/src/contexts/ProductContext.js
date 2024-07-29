import React, { createContext, useState, useContext, useEffect } from "react";
import { fetchProducts, addProduct, updateProduct, deleteProduct, checkout } from "../services/productServices";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  const loadProducts = async () => {
    try {
      const fetchedProducts = await fetchProducts();
      setProducts(fetchedProducts);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  const addNewProduct = async (product) => {
    try {
      const addedProduct = await addProduct(product);
      setProducts((prevProducts) => [...prevProducts, addedProduct]);
    } catch (error) {
      console.error("Failed to add product:", error);
    }
  };

  const editProduct = async (productId, updatedProduct) => {
    try {
      const updatedProd = await updateProduct(productId, updatedProduct);
      setProducts((prevProducts) =>
        prevProducts.map((prod) =>
          prod._id === productId ? updatedProd : prod
        )
      );
    } catch (error) {
      console.error("Failed to update product:", error);
    }
  };

  const removeProduct = async (productId) => {
    try {
      await deleteProduct(productId);
      setProducts((prevProducts) =>
        prevProducts.filter((prod) => prod._id !== productId)
      );
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  const buy = async (cartItems) => {
    try {
      await checkout(cartItems);
      alert("Purchase completed successfully!");
    } catch (error) {
      console.error("Failed to complete purchase:", error);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        loadProducts,
        addNewProduct,
        editProduct,
        removeProduct,
        buy,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => useContext(ProductContext);

export default ProductContext;
