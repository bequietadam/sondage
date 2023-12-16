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
            padding: 60px 60px 120px;
            max-width: 800px;
            min-width: 480px;
            margin: auto;
          }

          .layout .navbar {
            margin-right: 9px;
            margin-bottom: -14px;
            border: 3px solid var(--text);
            border-radius: 6px;
            background: var(--nav-gradient);
            z-index: 1;
          }

          .layout .content {
            display: flex;
            flex-direction: column;
            flex: 1 0 auto;
            margin-left: 12px;

            background: var(--primary-text);
            border: 3px solid var(--text);
            border-radius: 6px;
            padding: 12px 48px 30px;


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
        `}
      </style>
    </>
  );
}
