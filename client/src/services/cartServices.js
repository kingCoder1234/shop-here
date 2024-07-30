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
export const getAllCarts = async () => {
  const token = getToken();
  if (!token) {
    console.error("No token found, cannot logout.");
    return;
  }
  const response = await axios.get(`${API_BASE_URL}/carts`, getAuthConfig());
  return response.data;
};
export const getCart = async () => {
  const token = getToken();
  if (!token) {
    console.error("No token found, cannot logout.");
    return;
  }
  const user = await getProfile();
  const response = await axios.get(
    `${API_BASE_URL}/carts/${user._id}`,
    getAuthConfig()
  );
  return response.data;
};
export const addToCartAPI = async (productId) => {
  const token = getToken();
  if (!token) {
    console.error("No token found, cannot logout.");
    return;
  }
  try {
    const userProfile = await getProfile();
    const userId = userProfile._id;
    const response = await axios.post(
      `${API_BASE_URL}/cart/${userId}/add`,
      { productId },
      getAuthConfig()
    );
    return response.data;
  } catch (error) {
    console.error("Failed to add to cart:", error);
    throw error;
  }
};
export const removeFromCartAPI = async (productId) => {
  const token = getToken();
  if (!token) {
    console.error("No token found, cannot logout.");
    return;
  }
  const user = await getProfile();
  const response = await axios.delete(
    `${API_BASE_URL}/cart/${user._id}/remove/${productId}`,
    getAuthConfig()
  );
  return response.data;
};
export const updateCartItemAPI = async (productId, value) => {
  const token = getToken();
  if (!token) {
    console.error("No token found, cannot logout.");
    return;
  }

  const user = await getProfile();

  const response = await axios.put(
    `${API_BASE_URL}/cart/${user._id}/update`,
    { productId, value },
    getAuthConfig()
  );
  return response.data;
};
export const buyCartItemsAPI = async () => {
  const token = getToken();
  if (!token) {
    console.error("No token found, cannot logout.");
    return;
  }
  
  const user = getProfile();
  const response = await axios.post(
    `${API_BASE_URL}/cart/${user._id}/buy`,
    {},
    getAuthConfig()
  );
  return response.data;
};
