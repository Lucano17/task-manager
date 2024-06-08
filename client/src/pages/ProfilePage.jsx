import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const ProfilePage = () => {
  const { user, updateUser } = useAuth();
  const [editMode, setEditMode] = useState({ username: false, email: false, password: false });
  const [formData, setFormData] = useState({ username: user?.username, email: user?.email, password: "" });

  const handleEdit = (field) => {
    setEditMode({ ...editMode, [field]: true });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async (field) => {
    await updateUser(formData);
    setEditMode({ ...editMode, [field]: false });
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
        
        <button>Delete account</button>
      </div>
    </div>
  );
};

export default ProfilePage;
