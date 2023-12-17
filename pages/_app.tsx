import { useState } from 'react';
import type { AppProps } from 'next/app';
import localFont from 'next/font/local';
import { Concert_One } from 'next/font/google';

type Theme = 'light' | 'dark';

const ArgentumNovus = localFont({
  src: './fonts/Argentum-Novus-Black.ttf.woff'
});

const ConcertOneBasic = localFont({
  src: './fonts/concertone-regular.woff',
  preload: true,
  display: 'swap'
})

const ConcertOne = Concert_One({
  weight: '400',
  subsets: ["latin"],
  display: 'block'
});

const lightTheme = `
  :root {
    --primary: orchid;
    --primary-alt: #DE3163; 
    --primary-gradient: linear-gradient(to right, orchid 0%, #DE3163 100%);

    --nav-gradient: linear-gradient(178deg, #7FFFD4 0%, #50c878 180%);

    --main-gradient: linear-gradient(150deg,red -140%,cornsilk 30%, #fad5a5 70%, orangered 210%);

    --text: #3a3a3a;
    --background: #fdfdfd;
    --border: #d7d7d7;

    --primary-border: var(--primary);
    --button-small-border: var(--primary);

    --error: #DE3163;
    --success: #50c878;
  }
`

const darkTheme = `
  :root {
    --primary: #e94560; 
    --primary-alt: #0f3460;
    --primary-gradient: linear-gradient(to right, var(--primary) 0%, var(--primary-alt) 100%);

    --nav-gradient: linear-gradient(178deg, var(--primary-alt) 0%, #16213e 180%);

    --main-gradient: linear-gradient(150deg,var(--primary-alt) -140%, #1a1a2e 30%, #1a1a2e 70%, var(--primary) 210%);

    --text: #888;
    --background: #1a1a1a;
    --border: #111;

    --primary-border: var(--primary-alt);
    --button-small-border: var(--primary-alt);

    --error: #e94560;
    --success: #50c878;
  }
`


export default function MyApp({ Component, pageProps }: AppProps) {

  // const storedTheme = localStorage.getItem('theme');
  // const initTheme = (!!storedTheme ? storedTheme : window.matchMedia("(prefers-color-scheme:light)").matches ? 'light' : 'dark') as Theme;
  // const initTheme = (window.matchMedia("(prefers-color-scheme:light)").matches ? 'light' : 'dark') as Theme;
  const [theme, setTheme] = useState<Theme>('light')
  return (
    <main className={ConcertOne.className}>
      <Component {...pageProps} />
      <style jsx global>
        {`
        ${theme === 'light' ? lightTheme : darkTheme}
        *, *:before, *:after {
          box-sizing: inherit;
        }        
        html {
          display: flex;
          min-height: 100%;
          box-sizing: border-box;
          background: var(--background);
        }
        body {
          display: flex;
          margin: 0;
          flex: 1 1 100%;
          font-family: ${ConcertOne.style.fontFamily};
          
          color: var(--text);
        }
        #__next {
          display: flex;
          flex: 1 1 100%;
          padding: 8px;
          box-sizing: border-box;
        }
        main {
          display: flex;
          background: cornsilk;
          // background: linear-gradient(150deg,red -140%,cornsilk 30%, #fad5a5 70%, orangered 210%);
          background: var(--main-gradient);
          background-size: 400% 400%;
          // background-position: 100% 50%;
          animation: gradient 180s linear infinite;
          flex: 1 1 100%;
        }
        h1 {
          font-size: 3.6em;
          // line-height: 3em;
          margin: 0.4em 0;
          margin: 35px 0 .4em;
        }

        input, textarea {
          font-family: monospace;
        }

        
        .alert-error {
          width: 100%;
          color: var(--error);
          position: absolute;
        }
        .alert-message {
          width: 100%;
          color: var(--success);
          position: absolute;
        }

        @keyframes gradient {
          0% {
            background-position: 0% 15%;
          }
          50% {
            background-position: 100% 30%;
          }
          100% {
            background-position: 0% 15%;
          }
      `}</style>
    </main>
  )
}
