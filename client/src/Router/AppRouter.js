// src/Router/AppRouter.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ProductPage from "../pages/ProductPage";
import CartPage from "../pages/CartPage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import AdminPage from "../pages/AdminPage";
import UserProfilePage from "../pages/UserProfilePage";
import Layout from "../components/Layout";
import VerifyEmail from "../components/VerifyEmail";
import ProductDetails from "../components/Product/ProductDetails";
import About from "../components/About";

const AppRouter = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/products/:productId" element={<ProductDetails />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/profile" element={<UserProfilePage />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default AppRouter;
