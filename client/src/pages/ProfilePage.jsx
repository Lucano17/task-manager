// ProfilePage.jsx
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const ProfilePage = () => {
  const { user, updateUser, errors } = useAuth();
  const [editMode, setEditMode] = useState({ username: false, email: false, password: false });
  const [formData, setFormData] = useState({ username: user?.username, email: user?.email, password: "" });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleEdit = (field) => {
    setEditMode({ ...editMode, [field]: true });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async (field) => {
    try {
      const updatedData = {...formData}
      if (!formData.password) {
        delete updatedData.password
      }

      console.log("Updating user with data:", updatedData); // Log de datos enviados
      await updateUser(updatedData);
      setSuccessMessage("Profile updated successfully");
      setErrorMessage("");
      setEditMode({ ...editMode, [field]: false });
    } catch (error) {
      console.error("Save profile error:", error); // Log detallado de errores
      setErrorMessage(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div>
      <h1>Profile Page is not allowed yet.</h1>
      <h2>We are working on it c:</h2>
      <h4>Tasks quantity: number</h4>
      <h4>Account date created at: {user && new Date(user.createdAt).toLocaleDateString()}</h4>
      <div>
        <h2>Private settings</h2>
        
        <h3>
          Username: 
          {editMode.username ? (
            <>
              <input 
                type="text" 
                name="username" 
                value={formData.username} 
                onChange={handleChange} 
              />
              <button onClick={() => handleSave('username')}>Save</button>
            </>
          ) : (
            <>
              {user.username} 
              <button onClick={() => handleEdit('username')}>Edit</button>
            </>
          )}
        </h3>
        
        <h3>
          E-mail: 
          {editMode.email ? (
            <>
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
              />
              <button onClick={() => handleSave('email')}>Save</button>
            </>
          ) : (
            <>
              {user.email} 
              <button onClick={() => handleEdit('email')}>Edit</button>
            </>
          )}
        </h3>
        
        <h3>
          Password: 
          {editMode.password ? (
            <>
              <input 
                type="password" 
                name="password" 
                value={formData.password} 
                onChange={handleChange} 
              />
              <button onClick={() => handleSave('password')}>Save</button>
            </>
          ) : (
            <>
              ***** 
              <button onClick={() => handleEdit('password')}>Edit</button>
            </>
          )}
        </h3>

        {successMessage && <p>{successMessage}</p>}
        {errorMessage && <p>Error: {errorMessage}</p>}
        {errors.length > 0 && <p>Error: {errors.join(", ")}</p>}
        
        <button>Delete account</button>
      </div>
    </div>
  );
};

export default ProfilePage;
