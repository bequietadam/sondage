"use client"
import { MouseEventHandler, useState } from 'react';

type ThemeSwitcherProps = {
  onClick: (newTheme: string) => void;
  theme: string;
}


export default function ThemeSwitcher({ onClick, theme }: ThemeSwitcherProps) {
  // cycles through in following order: 'light' -> 'dark' -> 'night' -> 'light' and so on


  const changeTheme: MouseEventHandler<HTMLButtonElement> = () => onClick(theme === 'light' ? 'dark' : theme === 'dark' ? 'night' : 'light');

  return (
    <>
      <div className="theme-switcher" data-theme={theme} >
        <button
          suppressHydrationWarning={true}
          className="theme-toggle"
          id="theme-toggle"
          title="Toggle between light & dark theme"
          aria-label="auto"
          aria-live="polite"
          onClick={changeTheme}
        >{theme === 'light' ? 'dark theme' : theme === 'dark' ? 'night theme' : 'light theme'}
        </button>

      </div>
      <style jsx>
        {`

          .theme-switcher {
            position: fixed;
            bottom: 0;
            left: 0;
            padding: 12px;
            display: flex;
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
          
          @media (max-width: 480px) {
            .theme-switcher {
              height:32px;
              padding: 6px;
            }
          }
          
        `}
      </style>
    </>
  )

}
