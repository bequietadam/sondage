import Link from 'next/link';
import React from "react";

export default function Nav() {
  return (
    <nav className="navbar">
        <ul>
          <li>
            <Link href="/">home</Link>
          </li>
          <li>
            <Link href="/sondages">create</Link>
          </li>
        </ul>
        <h5 className="navbar__title">sondage</h5>
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

          nav ul li :global(a) {
            text-decoration: none;
            color: var(--text);
          }
          nav ul li :global(a):visited {
            color: var(--text);
          }
          nav ul li :global(a):active,
          nav ul li :global(a):hover {
            text-decoration: underline;
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
