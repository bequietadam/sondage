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
        body, html{
          height: 100%;
        }
        #__next {
          height: 100%;
        }
      `}</style>
      <style jsx>
        {`
        div, h1, h2, h3, h4, h5, h6 {
          font-family: 'Argentum-Novus-Black';
        }
        main {
          background: cornsilk;
          height: 100%;
        }
      `}</style>
    </main>
  )
}
