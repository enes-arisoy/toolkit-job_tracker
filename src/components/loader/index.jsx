import React from "react";
import styles from "./loader.module.scss";
import { FaSpinner } from "react-icons/fa";

const Loader = () => {
  return (
    <div className={styles.spinner}>
      <FaSpinner className="spin"/>
    </div>
  );
};

export default Loader;
