import React, { ReactChildren } from 'react';

type ButtonProps = {
  onClick?: () => void;
  children: ReactChildren | string;
  className?: string;
  type?: 'submit' | 'button';
}

export default function Button({ onClick = () => { }, children, className, type = 'button'}: ButtonProps) {



  return (
    <>
      <button className={className} onClick={onClick} type={type}>
        {children}
      </button>
      <style jsx>
        {`
          button {
            background: orchid;
            font-family: serif;
            font-weight: 900;
            font-size: 18px;
            border: 2px solid #000;
            border-radius: 12px;
            box-shadow: 3px 3px 0px #000;
            opacity: 0.9;
            padding: 18px 24px;
            transition: box-shadow .06s ease-in-out, opacity .12s ease-out;
          }
          button:hover {
            opacity: 1;
          }
          button:active {
            box-shadow: 0px 0px 0px #000;
          }

        `}
      </style>
    </>
  )
}
