import axios from "axios";
import { getProfile } from "./authService";

const API_BASE_URL = "http://localhost:5000/api";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};
export const getAllCarts = async () => {
  const response = await axios.get(`${API_BASE_URL}/carts`, getAuthHeader());
  return response.data;
};
export const getCart = async () => {
  const user = await getProfile();
  const response = await axios.get(
    `${API_BASE_URL}/carts/${user._id}`,
    getAuthHeader()
  );
  return response.data;
};
export const addToCartAPI = async (productId) => {
  const token = localStorage.getItem("token");
  try {
    const userProfile = await getProfile();
    const userId = userProfile._id;
    const response = await axios.post(
      `${API_BASE_URL}/cart/${userId}/add`,
      { productId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to add to cart:", error);
    throw error;
  }
};
export const removeFromCartAPI = async (productId) => {
  const user = await getProfile();
  const response = await axios.delete(
    `${API_BASE_URL}/cart/${user._id}/remove/${productId}`,
    getAuthHeader()
  );
  return response.data;
};
export const updateCartItemAPI = async (productId, value) => {
  const user = await getProfile();

  const response = await axios.put(
    `${API_BASE_URL}/cart/${user._id}/update`,
    { productId, value },
    getAuthHeader()
  );
  return response.data;
};
export const buyCartItemsAPI = async () => {
  const user = getProfile();
  const response = await axios.post(
    `${API_BASE_URL}/cart/${user._id}/buy`,
    {},
    getAuthHeader()
  );
  return response.data;
};
