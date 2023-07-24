import React from "react";
import styles from "./styles/Nav.module.css";

export default function Nav() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navItems}>
        <ul>
          <li>
            <a href="/">My Sondages & Posts</a>
          </li>
          <li>
            <a href="/sondages">Add Sondage</a>
          </li>
          <li>
            <a href="/posts">Add Post</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
