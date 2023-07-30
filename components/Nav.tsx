import React from "react";
import styles from "./styles/Nav.module.css";

export default function Nav() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navItems}>
        <ul>
          <li>
            <a href="/">All sondages</a>
          </li>
          <li>
            <a href="/sondages">Add sondage</a>
          </li>
        </ul>
      </div>
      <style jsx>
        {`
          .navbar {
            border-bottom: 1px #d4d4d4;
            width: 100%;
            display: flex;
            justify-content: center;
            border-bottom: 1px solid #d4d5d5;
          }

          .navItems ul {
            display: flex;
            justify-content: space-between;
            align-items: center;
            list-style-type: none;
          }

          .navItems ul li {
            margin-right: 10px;
          }

          .navItems ul li a {
            text-decoration: none;
          }
        `}
      </style>
    </nav>
  );
}
