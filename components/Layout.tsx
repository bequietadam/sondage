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
            position: relative;
            flex-direction: column;
            padding: 120px 60px 120px;
            width: 760px;
            min-height: 840px;
            margin: 0 auto;
            border-sizing: border-box;
          }

          .layout .navbar {
            margin-right: 9px;
            margin-bottom: -14px;
            // border: 3px solid var(--text);
            border: 3px solid var(--border);
            border-radius: 6px;
            background: var(--nav-gradient);
            z-index: 1;
            transition: all .15s ease-in-out;
          }
          .layout .content {
            display: flex;
            flex-direction: column;
            flex: 1 0 auto;
            margin-left: 12px;
            background: var(--background);
            // border: 3px solid var(--text);
            border: 3px solid var(--border);
            border-radius: 6px;
            padding: 20px 48px 30px;
            transition: all .15s ease-in-out;
            label {
              opacity: 0.6;
              margin-bottom: 6px;
            }
            p {
              margin-top: 0;
              // line-height: 0.9em;
            }
          }
          .layout .content label {
            opacity: 0.1;
          }
          .layout .form {
            max-width: 400px;
            margin: 10px auto;
          }
          .layout .form-group {
            width: 100%;
            margin-bottom: 10px;
            display: block;
          }
          .layout .home {
            width: 100%;
            margin: 10px auto;
          }


          @media (max-width: 480px) {
            .layout {
              width: 100%;
              min-width: auto;
              min-height: auto;
              flex-grow: 1;
              padding: 24px 12px 0px;
              margin: 0 0 60px;
            }
            .layout .navbar {
              margin-right: 7px;
            }
            .layout .content {
              // flex-grow: 0;
              margin-left: 10px;
              padding: 12px 30px 30px;
            }
          }
        `}
      </style>
    </>
  );
}
