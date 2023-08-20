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



  return (
    <>
      <button
        className={className}
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
            border: ${size === 'small' ? '2px solid orchid' : '3px solid #DE3163'};
            border-radius: 40px;
            box-shadow: ${size === 'small' ? '0px 0px 0px #DE3163' : '3px 3px 0px #DE3163'};
            opacity: 0.8;
            padding: ${size === 'small' ? '4px 12px 6px' : '10px 18px 12px'};
            transition: opacity .12s ease-out;
          }


          button:active, button:hover {
            opacity: 1;
          }
          button:active {
            box-shadow: 0px 0px 0px #DE3163;
            top: 3px;
            right: 0px;
          }button > :global(a) {
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
