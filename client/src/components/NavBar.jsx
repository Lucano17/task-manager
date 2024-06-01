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
          <h3>Welcome <span className={styles.navBarUsername}>{user.username}</span></h3>
          <ul>
            <li>
              <Link to="/tasks/new">Add task</Link>
            </li>
            <span>|</span>
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
          <ul>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <span>|</span>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </ul>
        </>
      )}
    </nav>
  );
};

export default NavBar;
