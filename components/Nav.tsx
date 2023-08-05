import React from "react";

export default function Nav() {
  return (
    <nav className="navbar">
      {/* <div className="navbar__container"> */}
        <ul>
          <li>
            <a href="/">All sondages</a>
          </li>
          <li>
            <a href="/sondages">Add sondage</a>
          </li>
        </ul>
        <h5 className="navbar__title">titlebar</h5>
      {/* </div> */}
      <style jsx>
        {`
          nav {
            width: 100%;
            display: flex;
            justify-content: space-betweeen;
          }

          nav ul {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            list-style-type: none;
          }

          nav ul li {
            margin-right: 10px;
          }

          nav ul li a {
            text-decoration: none;
          }

          nav h5 {
            margin-left: auto;
            padding-right: 20px;
            text-transform: uppercase;
          }
        `}
      </style>
    </nav>
  );
}
