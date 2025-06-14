import React from "react";
import styles from "./error.module.scss";

const Error = ({ message }) => {
  return (
    <div className={styles.error}>
      <h2>Oops! Something went wrong..!</h2>
      <h3>{message}</h3>
    </div>
  );
};

export default Error;
