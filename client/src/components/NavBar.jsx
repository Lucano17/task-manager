import React from "react";
import styles from "./NavBar.module.css";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const NavBar = () => {
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <nav className={styles.navBar}>
      <h1>Tasks Manager</h1>
      {isAuthenticated ? (
        <>
          <h3>Welcome {user.username}</h3>
          <ul>
            <li>
              <Link to="/tasks/new">Add task</Link>
            </li>
            <p>|</p>
            <li>
              <Link
                to="/"
                onClick={() => {
                  logout();
                }}
              >
                Log out
              </Link>
            </li>
          </ul>
        </>
      ) : (
        <>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <p>|</p>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </>
      )}
    </nav>
  );
};

export default NavBar;
