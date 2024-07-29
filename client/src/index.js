import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "./contexts/AuthContext";
import { ProductProvider } from "./contexts/ProductContext";
import { CartProvider } from "./contexts/CartContext";
import AppRouter from "./Router/AppRouter";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <CartProvider>
      <ProductProvider>
        <AppRouter />
      </ProductProvider>
    </CartProvider>
  </AuthProvider>
);
