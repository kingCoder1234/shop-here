import React from "react";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import { ProductProvider } from "./contexts/ProductContext";
import AppRouter from "./Router/AppRouter";

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <ProductProvider>
          <AppRouter />
        </ProductProvider>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
