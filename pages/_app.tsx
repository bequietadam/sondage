import { useState } from 'react';
import type { AppProps } from 'next/app';
import localFont from 'next/font/local';
import { Concert_One } from 'next/font/google';
import ThemeSwitcher from '../components/ThemeSwitcher';

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
    --button-text: var(--background);
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
    --border: #070707;

    --primary-border: var(--primary-alt);
    --button-text: var(--text);
    --button-small-border: var(--primary-alt);

    --error: #e94560;
    --success: #50c878;
  }
`
const darkTheme1 = `
  :root {
    --primary: #A13333; 
    --primary-alt: #B3541E;
    --primary-gradient: linear-gradient(to right, var(--primary) 0%, var(--primary-alt) 100%);

    --nav-gradient: linear-gradient(178deg, var(--primary) 0%, #461111 180%);

    --main-gradient: linear-gradient(150deg,var(--primary-alt) -140%, #040303 30%, #040303 70%, var(--primary) 210%);

    --text: #888;
    --background: #1a1a1a;
    --border: #111;

    --primary-border: var(--primary);
    --button-small-border: var(--primary-alt);

    --error: #e94560;
    --success: #50c878;
  }
`

const darkTheme2 = `
  :root {
    --primary: #3C415C; 
    --primary-alt: #301B3F;
    --primary-gradient: linear-gradient(to right, var(--primary) 0%, var(--primary-alt) 100%);

    --nav-gradient: linear-gradient(178deg, var(--primary) 0%, var(--primary-alt) 180%);

    --main-gradient: linear-gradient(150deg,var(--primary-alt) -140%, #151515 30%, #151515 70%, var(--primary) 210%);

    --text: #888;
    --background: #1a1a1a;
    --border: #111;

    --primary-border: var(--primary-alt);
    --button-small-border: var(--primary);

    --error: #e94560;
    --success: #50c878;
  }
`

const darkTheme3 = `
  :root {
    --primary: #A12568; 
    --primary-alt: #FEC260;
    --primary-gradient: linear-gradient(to right, var(--primary) 0%, var(--primary-alt) 100%);

    --nav-gradient: linear-gradient(178deg, #3B185F 0%, var(--primary) 180%);

    --main-gradient: linear-gradient(150deg,#3B185F -140%, #2A0944 30%, #2A0944 70%, var(--primary) 210%);

    --text: #888;
    --background: #1a1a1a;
    --border: #070707;

    --primary-border: var(--primary-alt);
    --button-small-border: var(--primary-alt);

    --error: #e94560;
    --success: #50c878;
  }
`

export default function MyApp({ Component, pageProps }: AppProps) {

  const [theme, setTheme] = useState((): string => {
    if (typeof window !== 'undefined') {
      const localTheme = window.localStorage.getItem('theme')
      if (localTheme === null || localTheme === undefined) {
        return 'light';
      }
      return `${localTheme}` ? localTheme : 'light';
    }
    return '';
  })

  const changeTheme = (newTheme: string) => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('theme', newTheme)
    }
    setTheme(newTheme)
  }




  return (
    <main className={ConcertOne.className}>
      <ThemeSwitcher onClick={changeTheme} theme={theme} />
      <Component {...pageProps} />
      <style jsx global>
        {`
        ${theme === 'light' ? lightTheme : darkTheme}
        :root {
          --breakpoint: 540px;
        }
        *, *:before, *:after {
          box-sizing: inherit;
        }        
        html {
          display: flex;
          width: 100%;
          min-height: 100%;
          box-sizing: border-box;
          background: var(--background);
          overflow-x: hidden;
        }
        body {
          display: flex;
          margin: 0;
          flex: 1 1 100%;
          font-family: ${ConcertOne.style.fontFamily};
          min-height: 100%;
          width: 100%;
          color: var(--text);
          transition: color .1s ease-in-out;
        }
        #__next {
          display: flex;
          flex: 1 1 100%;
          padding: 8px;
          box-sizing: border-box;
          min-height: 100%;
          width: 100%;
        }
        main {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100%;
          width: 100%;
          position: relative;
          background: cornsilk;
          // background: linear-gradient(150deg,red -140%,cornsilk 30%, #fad5a5 70%, orangered 210%);
          background: var(--main-gradient);
          background-size: 400% 400%;
          // background-position: 100% 50%;
          animation: gradient 180s linear infinite;
          flex: 1 1 100%;
          transition: all .3s ease-in-out;
        }
        h1 {
          font-size: 3.6em;
          line-height: 1.18em;
          margin: 35px 0 .4em;
        }
        h2 {
          font-size: 1.5em;
        }

        input, textarea {
          font-family: monospace;
        }

        .alert-error {
          width: 100%;
          color: var(--error);
          position: fixed;
        }
        .alert-message {
          width: 100%;
          color: var(--success);
          position: fixed;
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
        }
        
        @media (max-width: 480px) { 
          main {
            align-items: stretch;
          }
          h1 {
            font-size: 2.4em;
            line-height: 0.9em;
            margin: 35px 0 .6em;
          }
          h2 {
            font-size: 1.4em;
          }
        }

      `}</style>
    </main>
  )
}
