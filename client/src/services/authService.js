import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const API_BASE_URL = "http://localhost:5000/api";
const getToken = () => localStorage.getItem("token");

export const getAuthConfig = () => {
  const token = getToken();
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};
// Users
export const fetchUsers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users`, getAuthConfig());
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};
// Add New User
export const addNewUser = async (name, email, role, age, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users`, {
      name,
      email,
      age,
      role,
      password,
      isVerified: "true",
      shoppingCart: [],
      tokens: [],
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};
// Sign user
export const signup = async (name, email, age, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/signup`, {
      name,
      email,
      age,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};
// verify email
export const verifyEmail = async (code) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/verify-email`, { code });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};
// Edit User
export const editUser = async (userId, userData) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/users/${userId}`,
      userData,
      getAuthConfig()
    );
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};
// Delete User
export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/users/${userId}`,
      getAuthConfig()
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};
// Login
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, {
      email,
      password,
    });
    console.log(response.data)
    localStorage.setItem("token", response.data.token);
    if (response.status === 200) {
      toast.success(response.data.message);
    }
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};
// Get User Profile
export const getProfile = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/users/me`,
      getAuthConfig()
    );
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};
// Update User Profile
export const updateProfile = async (updatedFields) => {
  const user = await getProfile();
  try {
    const response = await axios.put(
      `${API_BASE_URL}/profile/${user._id}`,
      updatedFields,
      getAuthConfig()
    );
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};
// Logout
export const logout = async () => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/users/logout`,
      {},
      getAuthConfig()
    );
    localStorage.removeItem("token");
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};
