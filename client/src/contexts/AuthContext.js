import React, { createContext, useState, useContext } from "react";
import {
  fetchUsers,
  getProfile,
  login,
  signup,
  updateProfile,
  editUser,
  deleteUser,
  addNewUser,
  verifyEmail,
} from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [verificationMessage, setVerificationMessage] = useState("");

  const loadUsers = async () => {
    try {
      const fetchedUsers = await fetchUsers();
      setUsers(fetchedUsers);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };
  const loadUser = async () => {
    try {
      const fetchedUser = await getProfile();
      console.log(fetchedUser);
      setUser(fetchedUser);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };
  const handleSignup = async (name, email, password, age) => {
    try {
      const newUser = await signup(name, email, age, password);
      setUser(newUser);
    } catch (error) {
      console.error("Signup error:", error);
    }
  };
  const handleAddNewUser = async (name, email, role, age, password) => {
    try {
      const newUser = await addNewUser(name, email, role, age, password);
      setUser(newUser);
    } catch (error) {
      console.error("Signup error:", error);
    }
  };
  const handleLogin = async (email, password) => {
    try {
      const loggedInUser = await login(email, password);
      setUser(loggedInUser.user);
    } catch (error) {
      console.error("Login error:", error);
    }
  };
  const handleEmailVerification = async (code) => {
    try {
      const response = await verifyEmail(code);
      setVerificationMessage(response.message);
      if (response.user) {
        setUser(response.user);
      }
      return true;
    } catch (error) {
      setVerificationMessage(error.error || "Verification failed");
      console.error("Verification error:", error);
      return false;
    }
  };
  const fetchUserProfile = async () => {
    try {
      const userProfile = await getProfile();
      setUser(userProfile);
    } catch (error) {
      console.error("Fetch profile error:", error);
    }
  };
  const updateUserProfile = async (userData) => {
    try {
      const updatedProfile = await updateProfile(userData);
      setUser(updatedProfile);
      return updatedProfile;
    } catch (error) {
      console.error("Update profile error:", error);
    }
  };
  const handleEditUser = async (userId, userData) => {
    try {
      const updatedUser = await editUser(userId, userData);
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user._id === userId ? updatedUser : user))
      );
    } catch (error) {
      console.error("Edit user error:", error);
    }
  };
  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId);
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("Delete user error:", error);
    }
  };
  const handleLoggedInUser = async () => {
    try {
      const user = await getProfile();
      setUser(user);
    } catch (error) {
      console.error("Get logged-in user error:", error);
    }
  };
  const handleLogout = async () => {
    try {
      localStorage.removeItem("token");
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        users,
        handleAddNewUser,
        handleSignup,
        handleLogin,
        fetchUserProfile,
        updateUserProfile,
        handleLogout,
        loadUsers,
        loadUser,
        handleEditUser,
        handleDeleteUser,
        handleEmailVerification,
        handleLoggedInUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);

export default AuthContext;
