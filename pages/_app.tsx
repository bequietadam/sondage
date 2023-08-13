import type { AppProps } from 'next/app'
import localFont from 'next/font/local';
import { Concert_One } from 'next/font/google'

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


export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className={ConcertOne.className}>
      <Component {...pageProps} />
      <style jsx global>
        {`
        *, *:before, *:after {
          box-sizing: inherit;
        }        
        html {
          display: flex;
          min-height: 100%;
          box-sizing: border-box;
        }
        body {
          display: flex;
          margin: 0;
          flex: 1 1 100%;
          font-family: ${ConcertOne.style.fontFamily};
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
          background: linear-gradient(150deg, cornsilk 0%, #FAD5A5 180%);
          background-size: 300% 300%;
          animation: gradient 15s ease infinite;
          flex: 1 1 100%;
        }
        h1 {
          font-size: 3.6em;
          // line-height: 3em;
          margin: 0.4em 0;
        }

        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
      `}</style>
    </main>
  )
}
