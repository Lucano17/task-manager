import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import styles from "./ProfilePage.module.css";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, updateUser, errors, getUserTasksCount, deleteUser } = useAuth();
  const [editMode, setEditMode] = useState({
    username: false,
    email: false,
    password: false,
  });

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [tasksCount, setTasksCount] = useState(0);

  useEffect(() => {
    const fetchTasksCount = async () => {
      const count = await getUserTasksCount();
      setTasksCount(count);
    };
    fetchTasksCount();
  }, [getUserTasksCount]);

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username,
        email: user.email,
        password: "",
      });
    }
  }, [user]);

  const handleDelete = async () => {
    if (!user || !user.id) {
      console.error("User or User ID is not defined ptm", user);
      return;
    }

    const confirmed = window.confirm("Are you sure you want to delete this account?");
    if (confirmed) {
      await deleteUser(user.id);
      navigate("/");
    } else {
      console.log("Couldn't delete this account");
    }
  };

  const handleEdit = (field) => {
    setEditMode({ ...editMode, [field]: true });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async (field) => {
    try {
      const updatedData = { ...formData };
      if (!formData.password) {
        delete updatedData.password;
      }

      await updateUser(updatedData);
      setSuccessMessage("Profile updated successfully");
      setErrorMessage("");
      setEditMode({ ...editMode, [field]: false });
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "An error occurred");
    }
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.profilePageContainer}>
      <h2>Profile values</h2>
      <h4>
        Tasks quantity: <span>{tasksCount}</span>
      </h4>
      <h4>
        Account date created at:{" "}
        <span>{user && new Date(user.createdAt).toLocaleDateString()}</span>
      </h4>
      <div>
        <h2>Private settings</h2>

        <h3>
          Username:
          {editMode.username ? (
            <>
              <input
                className={styles.editInput}
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
              <button
                className={styles.saveButton}
                onClick={() => handleSave("username")}
              >
                Save
              </button>
            </>
          ) : (
            <>
              <span>{user.username}</span>
              <button
                className={styles.editButton}
                onClick={() => handleEdit("username")}
              >
                Edit
              </button>
            </>
          )}
        </h3>

        <h3>
          E-mail:
          {editMode.email ? (
            <>
              <input
                className={styles.editInput}
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <button
                className={styles.saveButton}
                onClick={() => handleSave("email")}
              >
                Save
              </button>
            </>
          ) : (
            <>
              <span>{user.email}</span>
              <button
                className={styles.editButton}
                onClick={() => handleEdit("email")}
              >
                Edit
              </button>
            </>
          )}
        </h3>

        <h3>
          Password:
          {editMode.password ? (
            <>
              <input
                className={styles.editInput}
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <button
                className={styles.saveButton}
                onClick={() => handleSave("password")}
              >
                Save
              </button>
            </>
          ) : (
            <>
              <span>*******</span>
              <button
                className={styles.editButton}
                onClick={() => handleEdit("password")}
              >
                Edit
              </button>
            </>
          )}
        </h3>

        {successMessage && <p className={styles.successMessage}>{successMessage}</p>}
        {errorMessage && <p className={styles.errorMessage}>Error: {errorMessage}</p>}
        {errors.length > 0 && <p className={styles.errorMessage}>Error: {errors.join(", ")}</p>}

        <button className={styles.deleteButton} onClick={handleDelete}>Delete account</button>
      </div>
    </div>
  );
};

export default ProfilePage;
