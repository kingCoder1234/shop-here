import React, { useEffect } from "react";
import { useProductContext } from "../contexts/ProductContext";
import ProductList from "../components/Product/ProductList";

const ProductPage = () => {
  const { products, loadProducts } = useProductContext();

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return (
    <div>
      <h1>Product Page</h1>
      <ProductList products={products} />
    </div>
  );
};

export default ProductPage;
