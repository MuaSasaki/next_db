import '../styles/global.css'
import { AppProps } from 'next/app' //追加部分

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
