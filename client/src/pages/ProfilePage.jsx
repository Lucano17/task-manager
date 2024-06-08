import React from "react";
import { useAuth } from "../context/AuthContext";
// import { profile } from "../../../src/controllers/auth.controller";

const ProfilePage = () => {
  const { user } = useAuth();
  return (
    <div>
      <h1>Profile Page is not allowed yet.</h1>
      <h2>We are working on it c:</h2>
      <h4>Tasks quantity: number</h4>
      <h4>Account date created at: {user && new Date(user.createdAt).toLocaleDateString()}</h4>
      <div>
        <h2>Private settings</h2>
        <h3>Username: {user.username} | <button>Edit</button></h3>
        <h3>E-mail: {user.email} | <button>Edit</button></h3>
        <h3>Password: ***** | <button>Edit</button></h3>
        <button>Delete account</button>
      </div>
    </div>
  );
};

export default ProfilePage;
