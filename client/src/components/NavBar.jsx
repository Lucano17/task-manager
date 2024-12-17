import React from "react";
import { useState, useEffect } from "react";
import styles from "./NavBar.module.css";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const NavBar = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const location = useLocation();

  const [windowDimention, setWindowDimention] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    setWindowDimention({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    const detectDimention = () => {
      setWindowDimention({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", detectDimention);
    return () => {
      window.removeEventListener("resize", detectDimention);
    };
  }, []);

  const getLinkDetails = () => {
    if (location.pathname === "/tasks") {
      return { to: "/profile", name: "Profile" };
    } else if (location.pathname === "/profile") {
      return { to: "/tasks", name: "Tasks" };
    } else {
      return { to: "/tasks", name: "Tasks" };
    }
  };
  const linkDetails = getLinkDetails();

  return (
    <nav className={styles.navBar}>
      <Link to={isAuthenticated ? "/tasks" : "/"}>
        <h1>Tasks Manager</h1>
      </Link>
      {isAuthenticated ? (
        <>
          <h3>
            {windowDimention.width > 650 && "Welcome"}
            {windowDimention.width > 520 && (
              <Link to="/profile" className={styles.navBarUsername}>
                {user.username}
              </Link>
            )}
          </h3>
          <ul>
            <li className={styles.linkRouters}>
              <Link className={styles.linkRouters} to={linkDetails.to}>
                {linkDetails.name}
              </Link>
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
            <li className={styles.linkRouters}>
              <Link className={styles.linkRouters} to="/login">
                Login
              </Link>
            </li>
            <span>|</span>
            <li>
              <Link className={styles.linkRouters} to="/register">
                Register
              </Link>
            </li>
          </ul>
        </>
      )}
    </nav>
  );
};

export default NavBar;
