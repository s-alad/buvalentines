import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import Script from "next/script";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <script src={'https://cdnjs.cloudflare.com/ajax/libs/three.js/r121/three.min.js'} />
        <script src={'https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.birds.min.js'} />
      </Head>
      <Component {...pageProps} />
    </>
  )
}
