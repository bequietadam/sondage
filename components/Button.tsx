import React, { ReactChildren, ReactElement } from 'react';

type ButtonProps = {
  children: ReactElement | string;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  size?: 'big' | 'small';
  type?: 'submit' | 'button';
}

export default function Button({ onClick = () => { }, children, className, disabled = false, size, type = 'button' }: ButtonProps) {

  const classNames = size === 'small' ? className + ' ' + size : className;

  return (
    <>
      <button
        className={classNames}
        disabled={disabled}
        onClick={onClick}
        type={type}
      >
        {children}
      </button>
      <style jsx>
        {`
          button {
            position:relative;
            background: linear-gradient(to right, orchid 0%, #DE3163 100%);
            font-weight: 900;
            color: white;
            right: 3px;
            border: 0;
            border: 3px solid #DE3163;
            border-radius: 40px;
            box-shadow: 3px 3px 0px #DE3163;
            opacity: 0.8;
            padding: 10px 18px 12px;
            transition: opacity .12s ease-out;
          }

          button.small {
            border: 2px solid orchid;
            box-shadow: 0px 0px 0px #DE3163;
            padding: 4px 12px 6px;
            right: 0px;
          }

          button:active, button:hover {
            opacity: 1;
          }

          button:active {
            box-shadow: 0px 0px 0px #DE3163;
            top: 3px;
            right: 0px;
          }
          button.small:active {
            top: 0;
            left: 2px;
          }
          button > :global(a) {
            text-decoration: none;
          }
          button > :global(a), button > :global(a):visited {
            // color: white;
          }

          
          button:disabled {
            opacity: 0.3;
          }
        `}
      </style>
    </>
  )
}
