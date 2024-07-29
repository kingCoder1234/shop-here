// EditProfileForm.js
import React, { useState, useEffect } from "react";
import { useAuthContext } from "../contexts/AuthContext";

const EditProfileForm = ({ user, onClose }) => {
  const { updateUserProfile } = useAuthContext();
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    profilePicture: "",
    mobileNumber: "",
    address: {
      village: "",
      district: "",
      state: "",
      country: "",
      pincode: "",
    },
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        age: user.age || "",
        profilePicture: user.profilePicture || "",
        mobileNumber: user.mobileNumber || "",
        address: {
          village: user.address?.village || "",
          district: user.address?.district || "",
          state: user.address?.state || "",
          country: user.address?.country || "",
          pincode: user.address?.pincode || "",
        },
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("address.")) {
      const addressField = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUserProfile(formData);
      alert("Profile updated successfully!");
      onClose(); // Close the form after successful update
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  return (
    <div className="edit-profile-form">
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Age:</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Profile Picture URL:</label>
          <input
            type="text"
            name="profilePicture"
            value={formData.profilePicture}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Mobile Number:</label>
          <input
            type="text"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
          />
        </div>
        <div>
          <h3>Address</h3>
          <label>Village/Town:</label>
          <input
            type="text"
            name="address.village"
            value={formData.address.village}
            onChange={handleChange}
          />
          <label>District:</label>
          <input
            type="text"
            name="address.district"
            value={formData.address.district}
            onChange={handleChange}
          />
          <label>State:</label>
          <input
            type="text"
            name="address.state"
            value={formData.address.state}
            onChange={handleChange}
          />
          <label>Country:</label>
          <input
            type="text"
            name="address.country"
            value={formData.address.country}
            onChange={handleChange}
          />
          <label>Pincode:</label>
          <input
            type="text"
            name="address.pincode"
            value={formData.address.pincode}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Update Profile</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default EditProfileForm;
