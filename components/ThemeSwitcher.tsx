"use client"
import { MouseEventHandler, useState } from 'react';

type ThemeSwitcherProps = {
  onClick: (newTheme: string) => void;
  theme: string;
}


export default function ThemeSwitcher({ onClick, theme }: ThemeSwitcherProps) {


  const changeTheme: MouseEventHandler<HTMLButtonElement> = () => onClick(theme === 'light' ? 'dark' : 'light');

  return (
    <>
      <div className="theme-switcher" data-theme={theme} >
        {/* <button onClick={() => changeTheme('light')} >light</button>
        <button onClick={() => changeTheme('dark')} >dark</button> */}
        <button
          suppressHydrationWarning={true}
          className="theme-toggle"
          id="theme-toggle"
          title="Toggle between light & dark theme"
          aria-label="auto"
          aria-live="polite"
          onClick={changeTheme}
        >{theme === 'light' ? 'dark theme' : 'light theme'}
        </button>

      </div>
      <style jsx>
        {`

          .theme-switcher {
            position: absolute;
            bottom: 0;
            padding: 12px;
            display: flex;
            right: 0;
            background: var(--background);
            height: 54px;
          }
          .theme-toggle {
            --size: 2rem;

            --icon-fill: #333;
            @media (hover: none) {
              --size: 48px;
            }
            font-family inherit;
            color: var(--text);
          
          
            background: var(--background);
            border: none; 
          
          
            cursor: pointer;
            touch-action: manipulation;
            -webkit-tap-highlight-color: transparent;
            outline-offset: 5px;
          
          }
          
          
        `}
      </style>
    </>
  )

}
