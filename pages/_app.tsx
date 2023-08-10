import type { AppProps } from 'next/app'
import localFont from 'next/font/local';

const myFont = localFont({
  src: './fonts/Argentum-Novus-Black.ttf.woff'
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className={myFont.className}>
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
        }
        #__next {
          display: flex;
          flex: 1 1 100%;
          padding: 8px;
          box-sizing: border-box;
        }
      `}</style>
      <style jsx>
        {`
        div, h1, h2, h3, h4, h5, h6 {
          font-family: 'Argentum-Novus-Black';
        }
        main {
          background: cornsilk;
          flex: 1 1 100%;
        }
      `}</style>
    </main>
  )
}
