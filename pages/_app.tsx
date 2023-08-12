import type { AppProps } from 'next/app'
import localFont from 'next/font/local';

const ArgentumNovus = localFont({
  src: './fonts/Argentum-Novus-Black.ttf.woff'
});

const ConcertOneBasic = localFont({
  src: './fonts/concertone-regular.woff'
})


export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className={ConcertOneBasic.className}>
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
          font-family: ${ConcertOneBasic.style.fontFamily};
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
          flex: 1 1 100%;
        }
        h1 {
          font-size: 3.6em;
          // line-height: 3em;
          margin: 0.4em 0;
        }
      `}</style>
    </main>
  )
}
