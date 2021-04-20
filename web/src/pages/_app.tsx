import { AppProps } from 'next/app';
import '@/styles/global.css';
import 'antd/dist/antd.css';
import '@/styles/Home.module.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Component {...pageProps} />
    </div>
  );
}
