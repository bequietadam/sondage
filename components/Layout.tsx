import React from "react";
import Navbar from "./Nav";

export default function Layout(props: any) {
  return (
    <>
      <div className="layout">
        <div className="navbar">
          <Navbar />
        </div>
        <div className="content">
          {props.children}
        </div>
      </div>
      <style jsx>
        {`
          .layout {
            display: flex;
            flex-direction: column;
            padding: 60px 18%;
            max-width: 800px;
            margin: auto;
          }

          .layout .navbar {
            margin-right: 9px;
            margin-bottom: -14px;
            border: 3px solid #000;
            border-radius: 6px;
            background: lightgreen;
            z-index: 1;
          }

          .layout .content {
            flex: 1 0 auto;
            margin-left: 12px;
            border: 3px solid #000;
            border-radius: 6px;
            padding: 24px 48px 30px;

            display: flex;
            flex-direction: column;
          }
        `}
      </style>
    </>
  );
}
