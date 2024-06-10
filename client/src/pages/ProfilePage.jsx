import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import styles from "./ProfilePage.module.css";

const ProfilePage = () => {
  const { user, updateUser, errors, getUserTasksCount } = useAuth();
  const [editMode, setEditMode] = useState({
    username: false,
    email: false,
    password: false,
  });
  const [formData, setFormData] = useState({
    username: user?.username,
    email: user?.email,
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

        {successMessage && <p>{successMessage}</p>}
        {errorMessage && <p>Error: {errorMessage}</p>}
        {errors.length > 0 && <p>Error: {errors.join(", ")}</p>}

        {/* <button>Delete account</button> */}
      </div>
    </div>
  );
};

export default ProfilePage;
