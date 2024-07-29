import axios from "axios";
import { getProfile } from "./authService";

const API_BASE_URL = "http://localhost:5000/api";
const getToken = () => localStorage.getItem("token");

const getAuthConfig = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
    "Content-Type": "application/json",
  },
});

export const fetchProducts = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/products`,
      getAuthConfig()
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    throw error;
  }
};

export const addProduct = async (product) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/addproduct`,
      product,
      getAuthConfig()
    );
    return response.data;
  } catch (error) {
    console.error("Failed to add product:", error);
    throw error;
  }
};

export const fetchProductById = async (id) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/products/${id}`,
      getAuthConfig()
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch product by ID:", error);
    throw error;
  }
};

export const updateProduct = async (id, updatedProduct) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/updateproduct/${id}`,
      updatedProduct,
      getAuthConfig()
    );
    return response.data;
  } catch (error) {
    console.error("Failed to update product:", error);
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    await axios.delete(`${API_BASE_URL}/deleteproduct/${id}`, getAuthConfig());
    return { message: "Product deleted successfully" };
  } catch (error) {
    console.error("Failed to delete product:", error);
    throw error;
  }
};

export const addToCart = async (productId) => {
  try {
    const user = await getProfile();
    const response = await axios.post(
      `${API_BASE_URL}/${user._id}/cart/addtocart`,
      { productId },
      getAuthConfig()
    );
    return response.data;
  } catch (error) {
    console.error("Error adding product to cart:", error.message);
    throw error;
  }
};

export const checkout = async (cartItems) => {
  alert("CheckOut successfully", cartItems);
};

export const getCart = async () => {
  try {
    const user = await getProfile();
    const response = await axios.get(
      `${API_BASE_URL}/${user._id}/cart`,
      getAuthConfig()
    );
    return response.data;
  } catch (error) {
    console.error("Error getting cart:", error.message);
    throw error;
  }
};

export const updateCartQuantity = async (productId, quantity) => {
  try {
    const user = await getProfile();
    const response = await axios.put(
      `${API_BASE_URL}/${user._id}/cart`,
      { productId, quantity },
      getAuthConfig()
    );
    return response.data;
  } catch (error) {
    console.error("Error updating cart quantity:", error.message);
    throw error;
  }
};

export const removeCartItem = async (productId) => {
  try {
    const user = await getProfile();
    const response = await axios.delete(
      `${API_BASE_URL}/${user._id}/cart/${productId}`,
      getAuthConfig()
    );
    return response.data;
  } catch (error) {
    console.error("Error removing cart item:", error.message);
    throw error;
  }
};

export const clearCart = async () => {
  try {
    const user = await getProfile();
    const response = await axios.delete(
      `${API_BASE_URL}/${user._id}/cart`,
      getAuthConfig()
    );
    return response.data;
  } catch (error) {
    console.error("Error clearing cart:", error.message);
    throw error;
  }
};
