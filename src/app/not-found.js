import React from "react";
import styles from "@/app/not-found.module.css";
export const metadata = {
  title: "404 Not Found",
};

function NotFound() {
  return (
    <article className={styles.wrapper}>
      <h1>404 Not Found</h1>
      <p>These page does not exist. Please check the URL and try again.</p>
    </article>
  );
}

export default NotFound;
