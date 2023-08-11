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
        html {
          display: flex;
          min-height: 100%;
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
        h1 {
          font-size: 3.6em;
          // line-height: 3em;
          margin: 0.4em 0;
        }
        main {
          background: cornsilk;
          flex: 1 1 100%;
        }
      `}</style>
    </main>
  )
}
