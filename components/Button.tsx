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
            right: 0px;
            border: 0;
            border: 3px solid #DE3163;
            border-radius: 40px;
            opacity: 0.8;
            padding: 10px 18px 12px;
            transition: .12s ease-out;
          }

          button.small {
            border: 2px solid orchid;
            padding: 4px 12px 6px;
          }

          button:active, button:hover {
            opacity: 1;
          }

          button:active {
            right: 2px;
            color: #DE3163;
          }

          button.small:active {
            top: 0;
            right: 2px;
          }

          button.remove {
            position: absolute;
            top: 5px;
            right: 6px;
          }
          button.remove:active {
            top: 5px;
            right: 8px;
          }
          button > :global(a) {
            text-decoration: none;
          }
          button > :global(a), button > :global(a):visited {
            color: white;
          }

          
          button:disabled, button:active:disabled {
            right: 0px;
            color: white;
            opacity: 0.3;
          }
        `}
      </style>
    </>
  )
}
