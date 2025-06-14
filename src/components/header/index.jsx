import React from "react";
import { FiClipboard } from "react-icons/fi";
import styles from "./header.module.scss";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className={styles.header}>
      <div>
        <img src="application.png" alt="logo" />
        <h2>Application Status</h2>
      </div>

      <nav>
        <NavLink to="/" className={(e) => (e.isActive ? styles.active : "")}>
          Applications
        </NavLink>
        <NavLink
          to="/job/create"
          className={(e) => (e.isActive ? styles.active : "")}
        >
          New Application
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
