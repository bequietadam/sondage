import { useState } from 'react';
import type { AppProps } from 'next/app';
import localFont from 'next/font/local';
import { Concert_One } from 'next/font/google';
import Navbar from "../components/Nav";
import ThemeSwitcher from '../components/ThemeSwitcher';
import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';

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

    --text: #999;
    --background: #1a1a1a;
    --border: #070707;

    --primary-border: var(--primary-alt);
    --button-text: #bbb;
    --button-small-border: var(--primary-alt);

    --error: #e94560;
    --success: #50c878;
  }
`

const nightTheme = `
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
    --button-text: var(--text);

    --error: #e94560;
    --success: #50c878;
  }
`

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const pageKey = router.asPath;

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
      <div className="layout">
        <div className="navbar">
          <Navbar />
        </div>
        <div className="content">
          <AnimatePresence initial={false} mode="wait">
            <Component key={pageKey} {...pageProps} />
          </AnimatePresence>
        </div>
      </div>
      <style jsx global>
        {`
        ${theme === 'light' ? lightTheme : theme === 'dark' ? darkTheme : nightTheme}
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


        
        .layout {
          display: flex;
          position: relative;
          flex-direction: column;
          width: 760px;
          min-height: 840px;
          // margin: 0 auto;
          border-sizing: border-box;
          
          padding: 60px 24px 0px;
          margin: 0 0 60px;
          overflow:hidden;
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
          flex: 1 0 auto;
          margin-left: 12px;
          background: var(--background);
          // border: 3px solid var(--text);
          border: 3px solid var(--border);
          border-radius: 6px;
          padding: 20px 48px 30px;
          transition: all .15s ease-in-out;
          overflow: hidden;
          p {
            margin-top: 0;
            // line-height: 0.9em;
          }
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

          .layout {
            width: 100%;
            min-width: auto;
            min-height: auto;
            flex-grow: 1;
            padding: 60px 12px 0px;
            margin: 0 0 32px;
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

      `}</style>
    </main>
  )
}
